// Router Component for admin routes
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

// Components
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import Users from './Users';
import RentalData from './RentalData';

// Routes
import { routes } from '../../constants/adminRoutes';

const { DASHBOARD, USERS, RENTAL_DATA } = routes;
const { Content, Footer } = Layout;

export default function Admin() {
  return (
    <Layout style={{ minHeight: '100vh', paddingTop: '3rem' }}>
      <SideMenu />
      <Layout style={{ paddingTop: '2rem' }}>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route
              path={DASHBOARD}
              exact
              render={props => <Dashboard {...props} />}
            />
            <Route path={USERS} render={props => <Users {...props} />} />
            <Route
              path={RENTAL_DATA}
              render={props => <RentalData {...props} />}
            />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 Created by Yalla</Footer>
      </Layout>
    </Layout>
  );
}
