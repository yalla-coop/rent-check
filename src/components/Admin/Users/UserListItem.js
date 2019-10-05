import React from 'react';
import { List, Icon, Tag } from 'antd';
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
    <UserTitle>
      <div style={{ marginRight: '0.4rem' }}>{name}</div>
      <UserLevel role={role} status={status} />
    </UserTitle>
  );
};

const UserListItem = ({ _id, name, email, role, status }) => {
  return (
    <List.Item key={_id} actions={[<a href="#">view</a>]}>
      <List.Item.Meta
        title={<Title name={name} status={status} role={role} />}
        description={email}
      />
    </List.Item>
  );
};

export default UserListItem;
