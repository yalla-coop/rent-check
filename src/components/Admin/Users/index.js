// Router for User routes
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import { Modal, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';

// components
import Table from '../Table';
||||||| merged common ancestors
import Loading from '../../Loading';
// components
import Table from '../Table';
=======
>>>>>>> master

// components
import AllUsers from './AllUsers';

// routes
import { routes } from '../../../constants/adminRoutes';

<<<<<<< HEAD
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

      const newUsers = userData.msg.filter(item => item._id !== userToDelete);

      setUserData({ msg: newUsers });
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
||||||| merged common ancestors
const { USERS_ALL } = routes;

export default function Users() {
  // fetch users
  const [{ data: msg, isLoading }] = useFetch('/.netlify/functions/getUsers');
=======
// status as filter base of users
import { status, roles } from '../../../constants/users';
>>>>>>> master

<<<<<<< HEAD
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
||||||| merged common ancestors
  // create table friendly data sets
  const users =
    msg &&
    msg.msg.map(({ _id, name, email, role, status }) => ({
      key: _id,
      name,
      email,
      level: role,
      status,
    }));
=======
const {
  USERS_ALL,
  USERS_VERIFY,
  USERS_SUPER_REQ,
  USERS_VERIFIED,
  USERS_SUPER,
} = routes;
>>>>>>> master

<<<<<<< HEAD
||||||| merged common ancestors
  console.log(users);
=======
export default function Users() {
>>>>>>> master
  return (
    <Switch>
<<<<<<< HEAD
      {loading && <Loading />}
||||||| merged common ancestors
      {isLoading && <Loading />}
=======
      <Route exact path={USERS_ALL} render={props => <AllUsers {...props} />} />
      <Route
        exact
        path={USERS_VERIFY}
        render={props => <AllUsers {...props} statusProp={status.UNVERIFIED} />}
      />
>>>>>>> master
      <Route
        exact
        path={USERS_SUPER_REQ}
        render={props => (
<<<<<<< HEAD
          <>
            <Table
              columns={usersCol}
              dataSource={users}
              {...props}
              loading={isLoading}
            />
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
||||||| merged common ancestors
          <Table columns={usersCol} dataSource={users} {...props} />
=======
          <AllUsers {...props} statusProp={status.AWAITING_SUPER} />
>>>>>>> master
        )}
      />
      <Route
        exact
        path={USERS_VERIFIED}
        render={props => <AllUsers {...props} statusProp={status.VERIFIED} />}
      />
      <Route
        exact
        path={USERS_SUPER}
        render={props => <AllUsers {...props} statusProp={roles.SUPERUSER} />}
      />
    </Switch>
  );
}
