// creates Tables for Users and Rental Data
// gets fed data source and column files as props
import React, { useState, useRef } from 'react';
import { Table, Input, Icon, Button, message } from 'antd';
import axios from 'axios';
import usePostPatchPut from '../../hooks/usePostPatchPut';

const admin = '5d8b623e8bdf5519b8627ca9';

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
  const [{ data: superStatusUpdate }, superStatusCall] = usePostPatchPut({
    url: '/.netlify/functions/manageSuperUserStatus',
    method: 'patch',
  });
  const [searchText, setSearchText] = useState('');

  const searchInputRef = useRef(null);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  // validate/reject super user status
  // patch function to manage super user status

  const approveSuperUser = user => {
    try {
      superStatusCall({
        admin,
        user,
        action: 'approve',
      });
      if (superStatusUpdate && Object.keys({ superStatusUpdate }).length > 0) {
        message.success(superStatusUpdate.msg);

        updateUsers().then(({ data: users }) => {
          const newUsers = createUserTable(users.msg);
          setUsers(newUsers);
        });
      }
    } catch (err) {
      message.error(err);
    }
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
        approveSuperUser,
      })}
      dataSource={dataSource}
      style={{ backgroundColor: '#ffffff' }}
      bordered
    />
  );
}
