// creates Drawer Menu
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

// styles
import { SideMenuWrapper, StyledButton as Button } from './SideMenu.style';

// menu structure
import { menuElements } from '../../../constants/adminRoutes';

const { SubMenu } = Menu;

const rootSubmenuKeys = menuElements.reduce((accu, current) => {
  if (current.items) {
    accu.push(current.route);
  }
  return accu;
}, []);

export default class SideMenu extends Component {
  state = {
    collapsed: false,
    openKeys: [],
  };

  componentDidMount() {
    const { menuSizeObserver } = this.props;
    const resizeObserver = new ResizeObserver(entries => {
      menuSizeObserver(entries[0].contentRect.width);
    });
    resizeObserver.observe(document.querySelector('#watcher'));
  }

  toggleCollapsed = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  onOpenChange = openKeys => {
    const { openKeys: openKeysState } = this.state;
    const latestOpenKey = openKeys.find(
      key => openKeysState.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    // should eventually be changed to props.location
    const { pathname } = window.location;
    const { collapsed, openKeys } = this.state;
    return (
      <SideMenuWrapper>
        <Button type="primary" onClick={this.toggleCollapsed}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['/']}
          defaultOpenKeys={[menuElements[0].title]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          onOpenChange={this.onOpenChange}
          openKeys={
            openKeys || [`/${pathname.split('/admin')[1].split('/')[1]}`]
          }
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
                      {/* <Icon type={item.icon} /> */}
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
        <div id="watcher" style={{ height: '1px', width: '100%' }} />
      </SideMenuWrapper>
    );
  }
}
