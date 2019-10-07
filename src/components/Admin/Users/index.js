// Router for User routes
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Modal, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';

// components
import Table from '../Table';

// Table props
import usersCol from './UsersColumns';

// routes
import { routes } from '../../../constants/adminRoutes';
import useFetch from '../../../hooks/useFetch';

const { USERS_ALL } = routes;

export default function Users() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const deleteUser = userId => {
    setUserToDelete(userId);
    toggleModal();
  };

  const confirmDelete = async () => {
    try {
      setDeletingUser(true);
      await axios.delete('/.netlify/functions/deleteUser', {
        data: {
          userId: userToDelete,
        },
      });
      const { data: newUsers } = await axios.get(
        '/.netlify/functions/getUsers'
      );
      setUserData(newUsers);
      setDeletingUser(false);
      setUserToDelete(null);
      toggleModal();
      return message.success('User and all related data successfully deleted');
    } catch (err) {
      setDeletingUser(false);
      setUserToDelete(null);
      toggleModal();
      return message.error(`Sorry, there was an error: ${err}`);
    }
  };

  // // fetch users
  // const data = useFetch('/.netlify/functions/getUsers');

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();

  const [{ data: msg, isLoading }] = useFetch(
    '/.netlify/functions/getUsers',
    userData
  );

  useEffect(() => {
    if (msg) {
      setLoading(isLoading);
      setUserData(msg);
    }
  }, [isLoading, msg]);

  // create table friendly data sets
  const users =
    userData &&
    userData.msg.map(({ _id, name, email, role, status }) => ({
      key: _id,
      name,
      email,
      level: role,
      status,
      actions: { id: _id, status, deleteUser },
    }));

  return (
    <Switch>
      {loading && <Loading />}
      <Route
        exact
        path={USERS_ALL}
        render={props => (
          <>
            <Table columns={usersCol} dataSource={users} {...props} />
            <Modal
              title="Are you sure?"
              visible={modalVisible}
              onOk={() => confirmDelete()}
              onCancel={() => toggleModal()}
              confirmLoading={deletingUser}
            >
              <p>
                Clicking confirm will delete this user and any rental data they
                have submitted. This action cannot be undone.
              </p>
            </Modal>
          </>
        )}
      />
    </Switch>
  );
}
