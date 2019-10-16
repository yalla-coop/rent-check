// Router Component for admin routes
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

// Components
import SideMenu from './SideMenu';

import adminRoutes from './adminRoutes';

const { Content, Footer } = Layout;

export default function Admin() {
  return (
    <Layout style={{ minHeight: '100vh', paddingTop: '3rem' }}>
      <SideMenu />
      <Layout style={{ paddingTop: '2rem' }}>
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            {adminRoutes.map(route => {
              return route.component ? (
                <Route
                  key={route.id}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 Created by Yalla</Footer>
      </Layout>
    </Layout>
  );
}
