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
import UsersColumns from './UsersColumns';
// import { status } from '../../../constants/users';

const { USERS_ALL, USERS_VERIFY } = routes;

// create table friendly data sets
const createUserTable = arr =>
  arr.map(({ _id, name, email, role, status }) => ({
    key: _id,
    name,
    email,
    level: role,
    status,
  }));

export default function Users() {
  const [users, setUsers] = useState(null);
  // fetch users
  const [{ data: allUsers, isLoading }] = useFetch(
    '/.netlify/functions/getUsers'
  );

  useEffect(() => {
    if (!isLoading && allUsers && allUsers.msg.length > 0) {
      const newUsers = createUserTable(allUsers.msg);
      setUsers(newUsers);
    }
  }, [allUsers, isLoading]);
  console.log(users && users.filter(u => u.status === 'unverified'));

  const tableProps = {
    colums: usersCol,
    dataSource: users,
    setUsers,
    createUserTable,
  };

  return (
    <Switch>
      {isLoading && <Loading />}
      <Route
        exact
        path={USERS_ALL}
        render={props => <Table {...tableProps, props} />}
      />
      {/* <Route
        exact
        path={USERS_VERIFY}
        render={props => (
          <Table
            columns={usersCol}
            dataSource={users && users.filter(u => u.status === 'unverified')}
            setUsers={setUsers}
            createUserTable={createUserTable}
            {...props}
          />
        )}
      />{' '} */}
      *
    </Switch>
  );
}
