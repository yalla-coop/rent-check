import React from 'react';
import { List, Tag, Button } from 'antd';
import { UserTitle } from './Users.style';
import { renderUserDetails } from '../../../constants/users';
import { userRoleColor } from '../../../constants/colors';

const UserLevel = ({ role, status }) => {
  if (role === 'user' && status === 'unverified') {
    return null;
  }
  return (
    <Tag color={userRoleColor[role]}>{renderUserDetails(role, status)}</Tag>
  );
};

const Title = ({ name, status, role }) => {
  return (
    <div>
      <span style={{ marginRight: '0.4rem' }}>{name}</span>
      <UserLevel role={role} status={status} />
    </div>
  );
};

const UserActions = () => (
  <div className="flex items-center justify-start">
    <Button
      style={{ color: '#219653', borderColor: '#219653' }}
      className="mr1"
      ghost
    >
      Approve
    </Button>
    <Button ghost style={{ color: '#EB5757', borderColor: '#EB5757' }}>
      Reject
    </Button>
  </div>
);

const UserListItem = ({ _id, name, email, role, status }) => {
  return (
    <List.Item key={_id}>
      <List.Item.Meta
        title={<Title name={name} status={status} role={role} />}
        description={email}
      />
      <UserActions />
    </List.Item>
  );
};

export default UserListItem;
