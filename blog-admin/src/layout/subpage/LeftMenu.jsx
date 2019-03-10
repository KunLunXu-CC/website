import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

const stateHook = ({ routeHook, location, history, collapsed }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    routeHook.setPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const { defaultOpenKeys, defaultSelectedKeys } = routeHook.defaultKeys;
    setOpenKeys(defaultOpenKeys);
    setSelectedKeys(defaultSelectedKeys);
  }, [routeHook.defaultKeys]);

  useEffect(() => {
    setOpenKeys([]);
  }, [collapsed]);

  const onMenuClick = ({ item, key, keyPath }) => {
    history && history.push(item.props.link || key);
  }

  const resetOpenKeys = (openKeys) => {
    setOpenKeys(openKeys);
  }

  const resetSetSelectedKeys = ({ item, key, selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  }

  return {openKeys, selectedKeys, resetOpenKeys, resetSetSelectedKeys, onMenuClick};
}

const LeftMenu = ({ collapsed, routeHook, history, location }) => {
  const state = stateHook({ collapsed, routeHook, location, history });
  return (
    <Sider trigger={null} className="base-sider" collapsible collapsed={collapsed} >
      <div> LOGO </div>
      <Menu 
        theme="dark" 
        mode="inline"
        openKeys={state.openKeys}
        inlineCollapsed={collapsed}
        selectedKeys={state.selectedKeys}
        onOpenChange={state.resetOpenKeys}
        onSelect={state.resetSetSelectedKeys}
        onClick = {state.onMenuClick}>
        {routeHook.menuChildren}
      </Menu>
    </Sider>
  );
}
export default withRouter(LeftMenu);
