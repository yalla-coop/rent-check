import React from 'react';
import { List, Tag, Button, Icon } from 'antd';
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

const UserListItem = ({ _id, name, email, role, status }) => {
  return (
    <List.Item key={_id}>
      <List.Item.Meta
        title={<Title name={name} status={status} role={role} />}
        description={email}
      />
      {role !== 'admin' && (
        <Button>
          <Icon type="form" />
        </Button>
      )}
    </List.Item>
  );
};

export default UserListItem;
