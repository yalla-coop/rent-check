// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Table, Input, Icon, Button, message, Modal } from 'antd';
import useApiCallback from '../../../hooks/useApiCallback';
import UsersColumns from './UsersColumns';

import { status as statusConst, roles } from '../../../constants/users';

// chooses data base for user table depending on section
const decideUserData = (userStatus, allUsersData) => {
  switch (userStatus) {
    case statusConst.UNVERIFIED:
      return allUsersData.filter(el => el.status === statusConst.UNVERIFIED);

    case statusConst.AWAITING_SUPER:
      return allUsersData.filter(
        el => el.status === statusConst.AWAITING_SUPER
      );

    case statusConst.VERIFIED:
      return allUsersData.filter(el => el.status === statusConst.VERIFIED);

    case roles.SUPERUSER:
      return allUsersData.filter(el => el.role === roles.SUPERUSER);

    default:
      return allUsersData;
  }
};

// create table friendly data sets
const createUserTable = arr =>
  arr.map(({ _id, name, email, role, status }) => ({
    key: _id,
    name,
    email,
    level: role,
    status,
  }));

export default function AllUsers({ statusProp }) {
  const [
    { data: allUsersData, isLoading: allUsersDataIsLoading },
    getAllUsersData,
  ] = useApiCallback('get', '/api/admin/users');

  const [
    { data: userStatusData, error: userStatusUpdateHasErrored },
    updateUserStatus,
  ] = useApiCallback('patch', '/api/admin/users');

  const [
    { data: deletedUser, error: userDeleteError },
    deleteUserApi,
  ] = useApiCallback('delete', '/api/admin/users');

  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const toggleModal = () => setModalVisible(!modalVisible);

  // get all user data on page load or when user status is updated
  useEffect(() => {
    if (userStatusUpdateHasErrored) {
      try {
        return message.error(userStatusUpdateHasErrored);
      } catch (e) {
        return message.error(
          'An error occurred in processing your request. Please try again later.'
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
          'An error occurred deleting user. Please try again later.'
        );
      }
    }
    if (updatingUser && userToUpdate) {
      setUpdatingUser(false);
      setUserToUpdate(null);
      message.success(userStatusData && userStatusData.msg);
    }
    if (deletingUser && userToDelete) {
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
    setUpdatingUser(true);
    setUserToUpdate(updatedUser);
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

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{ fontSize: '20px', color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select());
      }
    },
  });

  return (
    <>
      <Table
        columns={UsersColumns({
          getColumnSearchProps,
          searchText,
          manageUserStatusOnClick,
          deleteUser,
        })}
        dataSource={
          allUsersData &&
          createUserTable(decideUserData(statusProp, allUsersData))
        }
        style={{ backgroundColor: '#ffffff' }}
        bordered
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
    </>
  );
}
