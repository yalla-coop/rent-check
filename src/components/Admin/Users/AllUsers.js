// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Table, Input, Icon, Button, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';
import usePostPatchPut from '../../../hooks/usePostPatchPut';
import useFetch from '../../../useFetch';
import UsersColumns from './UsersColumns';

import { status as statusConst, roles } from '../../../constants/users';
// admin user -> please change id for testing
const admin = '5d8b623e8bdf5519b8627ca9';

// chooses data base for user table depending on section
const decideUserData = (userStatus, users) => {
  switch (userStatus) {
    case statusConst.UNVERIFIED:
      return users.filter(el => el.status === statusConst.UNVERIFIED);

    case statusConst.AWAITING_SUPER:
      return users.filter(el => el.status === statusConst.AWAITING_SUPER);

    case statusConst.VERIFIED:
      return users.filter(el => el.status === statusConst.VERIFIED);

    case roles.SUPERUSER:
      return users.filter(el => el.level === roles.SUPERUSER);

    default:
      return users;
  }
};

// updates user object
const updateUsers = async () => {
  const request = await axios.get('/.netlify/functions/getUsers');
  return request;
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
      const newUsers = createUserTable(allUsers.msg);
      setUsers(newUsers);
    }
  }, [allUsers]);

  // listens for response coming from patch request to update user
  // renders message to user and updates user table
  useEffect(() => {
    if (updateUserStatus && updateUserStatus.msg) {
      updateUsers()
        .then(({ data: updatedUsers }) => {
          const updateAllUsers = createUserTable(updatedUsers.msg);
          setUsers(updateAllUsers);
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
    <Fragment>
      {isLoading && <Loading />}
      <Table
        columns={UsersColumns({
          getColumnSearchProps,
          searchText,
          manageUserStatusOnClick,
        })}
        dataSource={users && decideUserData(statusProp, users)}
        style={{ backgroundColor: '#ffffff' }}
        bordered
      />
    </Fragment>
  );
}
