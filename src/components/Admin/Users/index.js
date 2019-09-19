// Router for User routes

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Table from '../Table';

// Table props
import usersCol from './UsersColumns';
import { dataSource } from './dummyUsers';

// routes
import { routes } from '../../../constants/adminRoutes';

const { USERS_ALL } = routes;

export default class Users extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={USERS_ALL}
          render={props => (
            <Table columns={usersCol} dataSource={dataSource} {...props} />
          )}
        />
      </Switch>
    );
  }
}
