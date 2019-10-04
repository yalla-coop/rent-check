// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, Icon, Button, message } from 'antd';
import axios from 'axios';
import Loading from '../../Loading';
import usePostPatchPut from '../../hooks/usePostPatchPut';
import useFetch from '../../useFetch';
import UsersColumns from './Users/UsersColumns';
// admin user -> please change id for testing
const admin = '5d8b623e8bdf5519b8627ca9';

// updates user object
const updateUsers = async () => {
  const request = await axios.get('/.netlify/functions/getUsers');
  return request;
};

export default function TableComponent({
  columns,
  dataSource,
  setUsers,
  createUserTable,
}) {
  // custom hook for patch request to manage user status
  const [{ data: updateUserStatus }, updateUserStatusCall] = usePostPatchPut({
    url: '/.netlify/functions/manageUserStatus',
    method: 'patch',
  });

  const [searchText, setSearchText] = useState('');

  const searchInputRef = useRef(null);

  // listens for response coming from patch request to update user
  // renders message to user and updates user table
  useEffect(() => {
    if (updateUserStatus && updateUserStatus.msg) {
      updateUsers()
        .then(({ data: users }) => {
          const newUsers = createUserTable(users.msg);
          setUsers(newUsers);
        })
        .catch(err => message.error(err));
      return message.success(updateUserStatus && updateUserStatus.msg);
    }
  }, [updateUserStatus, setUsers, createUserTable]);

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
    <Table
      columns={columns({
        getColumnSearchProps,
        searchText,
        manageUserStatusOnClick,
      })}
      dataSource={dataSource}
      style={{ backgroundColor: '#ffffff' }}
      bordered
    />
  );
}
