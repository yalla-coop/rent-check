// sets columns for user table
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Icon } from 'antd';
import { renderUserDetails, status } from '../../../constants/users';

export default ({
  getColumnSearchProps,
  searchText,
  manageUserStatusOnClick,
}) => {
  // renders btn to approve or reject user/ super user
  const renderActionBtn = (
    userId,
    userStatus,
    action,
    { color, borderColor }
  ) => (
    <Button
      style={{ color, borderColor }}
      className="mr1"
      ghost
      onClick={() => manageUserStatusOnClick(userId, action, userStatus)}
    >
      {action}
    </Button>
  );

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
        return [status.UNVERIFIED, status.AWAITING_SUPER].includes(
          record.status
        ) ? (
          <div className="flex items-center justify-between">
            {renderActionBtn(record.key, record.status, 'approve', {
              color: '#219653',
              borderColor: '#219653',
            })}
            {renderActionBtn(record.key, record.status, 'reject', {
              color: '#EB5757',
              borderColor: '#EB5757',
            })}
          </div>
        ) : null;
      },
    },
  ];

  return tableColumns;
};
