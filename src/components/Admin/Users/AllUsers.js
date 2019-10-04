// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { List, Input, Icon, Button, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';
import usePostPatchPut from '../../../hooks/usePostPatchPut';
import useFetch from '../../../hooks/useFetch';
// import UsersColumns from './UsersColumns';
import ListWithFilter from './ListWithFilter';
import UserListItem from './UserListItem';
import { status as statusConst, roles } from '../../../constants/users';

// admin user -> please change id for testing
const admin = '5d8b623e8bdf5519b8627ca9';

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

// updates user object
const updateUsers = async () => {
  const request = await axios.get('/.netlify/functions/getUsers');
  return request;
};

export default function AllUsers({ statusProp }) {
  // fetch users
  const [{ data: allUsers, isLoading }] = useFetch(
    '/.netlify/functions/getUsers'
  );

  // patch request to manage user status
  const [{ data: updateUserStatus }, updateUserStatusCall] = usePostPatchPut({
    url: '/.netlify/functions/manageUserStatus',
    method: 'patch',
  });

  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState(null);

  const searchInputRef = useRef(null);

  // sets users
  useEffect(() => {
    if (allUsers && allUsers.msg) {
      setUsers(allUsers.msg);
    }
  }, [allUsers]);

  // listens for response coming from patch request to update user
  // renders message to user and updates user table
  useEffect(() => {
    if (updateUserStatus && updateUserStatus.msg) {
      updateUsers()
        .then(({ data: updatedUsers }) => {
          setUsers(updatedUsers.msg);
        })
        .catch(err => message.error(err));
      return message.success(updateUserStatus && updateUserStatus.msg);
    }
  }, [updateUserStatus, setUsers, allUsers]);

  // validate/reject (super) user status
  // takes user id, status (awaiting verification/ awaiting super user) and action (reject, approve)

  const manageUserStatusOnClick = (user, action, userStatus) => {
    updateUserStatusCall({
      admin,
      user,
      action,
      userStatus,
    });
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  return (
    <Fragment>
      {isLoading && <Loading />}
      <ListWithFilter
        dataSource={filterUsersByStatus(statusProp, users)}
        renderItem={UserListItem}
        pagination={{ position: 'bottom' }}
      />
    </Fragment>
  );
}
