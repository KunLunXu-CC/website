/**
 * 左侧菜单栏： 配置和路由配置一致
 */
import React from 'react';
import { Button, Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

class LeftMenu extends React.Component{
  render(){
    return (
      <Sider style={{height: '100%'}} trigger={null} collapsible collapsed={false} >
        <Menu style={{minHeight: '100%'}} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>

    );
  }
}
export default LeftMenu;
