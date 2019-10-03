// Router for User routes
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../../Loading';
// components
import Table from '../Table';

// Table props
import usersCol from './UsersColumns';

// routes
import { routes } from '../../../constants/adminRoutes';
import useFetch from '../../../useFetch';

const { USERS_ALL } = routes;

export default function Users() {
  const [users, setUsers] = useState(null);
  // fetch users
  const [{ data: msg, isLoading }] = useFetch('/.netlify/functions/getUsers');
  // create table friendly data sets
  const createUserTable = arr =>
    arr.map(({ _id, name, email, role, status }) => ({
      key: _id,
      name,
      email,
      level: role,
      status,
    }));

  useEffect(() => {
    if (!isLoading && msg && msg.msg.length > 0) {
      const newUsers = createUserTable(msg.msg);
      setUsers(newUsers);
    }
  }, [msg, isLoading]);

  return (
    <Switch>
      {isLoading && <Loading />}
      <Route
        exact
        path={USERS_ALL}
        render={props => (
          <Table
            columns={usersCol}
            dataSource={users}
            setUsers={setUsers}
            createUserTable={createUserTable}
            {...props}
          />
        )}
      />
    </Switch>
  );
}
