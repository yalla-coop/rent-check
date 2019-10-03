// sets columns for user table
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Icon } from 'antd';
import { renderUserDetails } from '../../../constants/users';

import useAPI from '../../../useAPI';

export default ({ getColumnSearchProps, searchText }) => {
  // admin for request (just for testing)
  const admin = '5d8b623e8bdf5519b8627ca9';

  // patch function to manage super user status
  const [{ data }, apiCall] = useAPI({
    url: '/.netlify/functions/manageSuperUserStatus',
  });

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <span style={{ fontWeight: '700' }}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </span>
      ),
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (text, record) => (
        <div className="flex items-center justify-between">
          <span>{renderUserDetails[text]}</span>

          {record.level && record.level === 'user' ? (
            <Button>
              <Icon type="form" />
            </Button>
          ) : (
            ''
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span>{renderUserDetails[text]}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => {
        return (
          <div className="flex items-center justify-between">
            <Button
              style={{ color: '#219653', borderColor: '#219653' }}
              className="mr1"
              ghost
              onClick={() =>
                apiCall({
                  admin,
                  user: record.key,
                  action: 'approve',
                })
              }
            >
              Approve
            </Button>
            <Button
              ghost
              style={{ color: '#EB5757', borderColor: '#EB5757' }}
              onClick={() =>
                apiCall({
                  admin,
                  user: record.key,
                  action: 'reject',
                })
              }
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];

  return tableColumns;
};
