// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useEffect, Fragment } from "react";
import { message, Modal } from "antd";
import useApiCallback from "../../../hooks/useApiCallback";
//import UsersColumns from "./UsersColumns";
import ListWithFilter from '../ListWithFilter';
import UserListItem from './UserListItem';

import { status as statusConst, roles } from "../../../constants/users";

// chooses data base for user table depending on section
const filterUsersByStatus = (userStatus, users) => {
  if (!users) {
    return [];
  }
  switch (userStatus) {
    case statusConst.UNVERIFIED:
      return users.filter(el => el.status === statusConst.UNVERIFIED);

    case statusConst.AWAITING_SUPER:
      return users.filter(el => el.status === statusConst.AWAITING_SUPER);

    case statusConst.VERIFIED:
      return users.filter(el => el.status === statusConst.VERIFIED);

    case roles.SUPERUSER:
      return users.filter(el => el.role === roles.SUPERUSER);

    default:
      return users;
  }
};

// create table friendly data sets
// const createUserTable = arr =>
//   arr.map(({ _id, name, email, role, status }) => ({
//     key: _id,
//     name,
//     email,
//     level: role,
//     status,
//   }));

export default function AllUsers({ statusProp }) {
  const [
    { data: allUsersData, isLoading: allUsersDataIsLoading },
    getAllUsersData,
  ] = useApiCallback("get", "/api/admin/users");

  useEffect(() => {
    getAllUsersData();
  }, [getAllUsersData])

  const [
    { data: userStatusData, error: userStatusUpdateHasErrored },
    updateUserStatus,
  ] = useApiCallback("patch", "/api/admin/users");

  const [
    { data: deletedUser, error: userDeleteError },
    deleteUserApi,
  ] = useApiCallback("delete", "/api/admin/users");

  const [modalVisible, setModalVisible] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const toggleModal = () => setModalVisible(!modalVisible);

  // get all user data on page load or when user status is updated
  useEffect(() => {
    if (userStatusUpdateHasErrored) {
      try {
        return message.error(userStatusUpdateHasErrored);
      } catch (e) {
        return message.error(
          "An error occurred in processing your request. Please try again later."
        );
      }
    }
    if (userDeleteError) {
      setDeletingUser(false);
      setUserToDelete(null);
      toggleModal();
      try {
        return message.error(userDeleteError);
      } catch (e) {
        return message.error(
          "An error occurred deleting user. Please try again later."
        );
      }
    }
    if (userStatusData) {
      message.success(userStatusData && userStatusData.msg);
    }
    if (deletedUser) {
      setDeletingUser(false);
      setUserToDelete(null);
      toggleModal();
      message.success(deletedUser && deletedUser.msg);
    }
    return getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAllUsersData,
    userStatusUpdateHasErrored,
    userStatusData,
    deletedUser,
    userDeleteError,
  ]);

  // validate/reject (super) user status
  // takes user id, status (awaiting verification/ awaiting super user) and action (reject, approve)

  const manageUserStatusOnClick = updatedUser => {
    updateUserStatus(updatedUser);
  };

  const deleteUser = userId => {
    setUserToDelete(userId);
    toggleModal();
  };

  const confirmDelete = () => {
    setDeletingUser(true);
    deleteUserApi({ data: { userId: userToDelete } });
  };

  const actions = {
    manageUserStatusOnClick,
    deleteUser,
  }

  return (
    <Fragment>
      <ListWithFilter
        dataSource={filterUsersByStatus(statusProp, allUsersData)}
        renderItem={props => <UserListItem {...props} actions={actions} />}
        pagination={{ position: 'bottom' }}
        loading={allUsersDataIsLoading}
      />
      <Modal
        title="Are you sure?"
        visible={modalVisible}
        onOk={() => confirmDelete()}
        onCancel={() => toggleModal()}
        confirmLoading={deletingUser}
      >
        <p>
          Clicking confirm will delete this user and any rental data they have
          submitted. This action cannot be undone.
        </p>
      </Modal>
    </Fragment>
  );
}
