// creates Drawer Menu
import React, { useState } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';

// menu structure
import { menuElements } from '../../../constants/adminRoutes';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => {
        setCollapsed(value);
      }}
      theme="light"
    >
      <div className="logo" />
      <Menu
        defaultSelectedKeys={['/']}
        defaultOpenKeys={[menuElements[0].title]}
        mode="inline"
        theme="light"
      >
        {menuElements.map(element =>
          element.items ? (
            <SubMenu
              style={{ textAlign: 'left' }}
              key={element.route}
              title={
                <span>
                  <Icon type={element.icon} />
                  <span>{element.title}</span>
                </span>
              }
            >
              {element.items.map(item => (
                <Menu.Item
                  key={element.route + item.route}
                  style={{ textAlign: 'left' }}
                >
                  <Link to={`/admin${element.route + item.route}`}>
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={element.route} style={{ textAlign: 'left' }}>
              <Link to={`/admin${element.route}`}>
                <Icon type={element.icon} />
                <span>{element.title}</span>
              </Link>
            </Menu.Item>
          )
        )}
        <Menu.Item style={{ textAlign: 'left' }}>
          <Link to="/">
            <Icon type="home" />
            <span>Vist Website</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}