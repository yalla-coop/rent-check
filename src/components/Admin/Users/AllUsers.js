// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Table, Input, Icon, Button, message } from 'antd';
import useApiCallback from '../../../hooks/useApiCallback';
import UsersColumns from './UsersColumns';

import { status as statusConst, roles } from '../../../constants/allUsersData';
// admin user -> please change id for testing
const admin = '5d98462431532f74cc6879c5';

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
      return allUsersData.filter(el => el.level === roles.SUPERUSER);

    default:
      return allUsersData;
  }
};

// updates user object
// const updateUsers = async () => {
//   const request = await axios.get('/.netlify/functions/getUsers');
//   return request;
// };

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
  ] = useApiCallback('get', '/.netlify/functions/getUsers');

  const [
    { data: userStatusData, error: userStatusUpdateHasErrored },
    updateUserStatus,
  ] = useApiCallback('patch', '/.netlify/functions/manageUserStatus');

  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  // get all user data on page load
  useEffect(() => {
    getAllUsersData();
  }, [getAllUsersData]);

  // validate/reject (super) user status
  // takes user id, status (awaiting verification/ awaiting super user) and action (reject, approve)

  const manageUserStatusOnClick = (user, action, userStatus) => {
    updateUserStatus({
      admin,
      user,
      action,
      userStatus,
    }).then(() => {
      if (
        userStatusUpdateHasErrored &&
        userStatusUpdateHasErrored.response.data.error
      ) {
        return message.error(userStatusUpdateHasErrored.response.data.error);
      }
      getAllUsersData();
      return message.success(userStatusData && userStatusData.msg);
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
      <Table
        columns={UsersColumns({
          getColumnSearchProps,
          searchText,
          manageUserStatusOnClick,
        })}
        dataSource={allUsersData && decideUserData(statusProp, allUsersData)}
        style={{ backgroundColor: '#ffffff' }}
        bordered
        loading={allUsersDataIsLoading}
      />
    </Fragment>
  );
}
