// sets columns for user table

import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Icon, Tag, Divider } from 'antd';

// constants
import {
  renderUserDetails,
  status as constStatus,
} from '../../../constants/users';

export default ({ getColumnSearchProps, searchText }) => {
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
      render: (text, record) => (
        <Tag color={`var(--${text})`}>{renderUserDetails[text]}</Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions, record) => (
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            {actions && actions.status !== constStatus.VERIFIED && (
              <Button
                style={{ color: '#219653', borderColor: '#219653' }}
                className="mr1"
                ghost
              >
                Approve
              </Button>
            )}
            {actions && actions.status !== constStatus.REJECTED && (
              <Button
                ghost
                style={{ color: '#EB5757', borderColor: '#EB5757' }}
              >
                Reject
              </Button>
            )}
          </span>
          <span className="flex items-center">
            <Divider type="vertical" />
            <Button
              style={{
                color: 'var(--red)',
                borderColor: 'var(--red)',
              }}
              className="mr1 self-end"
              ghost
              onClick={() => actions.deleteUser(actions.id)}
            >
              <Icon type="delete" />
            </Button>
          </span>
        </div>
      ),
    },
  ];

  return tableColumns;
};
