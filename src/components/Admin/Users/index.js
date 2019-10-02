// Router for User routes
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../Loading';
// components
import Table from '../Table';

// Table props
import usersCol from './UsersColumns';

// routes
import { routes } from '../../../constants/adminRoutes';
import useFetch from '../../../useFetch';
import usePatch from '../../../usePatch';

const { USERS_ALL } = routes;

export default function Users() {
  // fetch users
  const [{ data: msg, isLoading }] = useFetch('/.netlify/functions/getUsers');

  // create table friendly data sets
  const users =
    msg &&
    msg.msg.map(({ _id, name, email, role, status }) => ({
      key: _id,
      name,
      email,
      level: role,
      status,
    }));

  console.log(users);
  return (
    <Switch>
      {isLoading && <Loading />}
      <Route
        exact
        path={USERS_ALL}
        render={props => (
          <Table columns={usersCol} dataSource={users} {...props} />
        )}
      />
    </Switch>
  );
}
