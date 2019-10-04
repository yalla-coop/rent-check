import React from 'react';
import { List, Icon } from 'antd';
import { RoleTile, UserTitle } from './Users.style';

const Title = ({ name, status, role }) => {
  return (
    <UserTitle>
      <div style={{ marginRight: '0.4rem' }}>{name}</div>
      <div>
        <RoleTile>{role}</RoleTile>
        {status !== 'unverified' ? (
          <Icon type="check" style={{ marginLeft: '0.5rem', color: 'green' }} />
        ) : (
          ''
        )}
      </div>
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
