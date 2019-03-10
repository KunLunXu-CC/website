import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

const stateHook = ({ routeHook, location, history, collapsed }) => {

  useEffect(() => {
    routeHook.setPathname(location.pathname);
  }, [location.pathname]);

  const onMenuClick = ({ item, key, keyPath }) => {
    history && history.push(item.props.link || key);
  }

  const onOpenChange = (openKeys) => {
    routeHook.setKeys({ ...routeHook.keys, openKeys });
  }

  const keys = useMemo(() => {
    const values = { selectedKeys: routeHook.keys.selectedKeys };
    !collapsed && (values.openKeys = routeHook.keys.openKeys);
    return values;
  }, [routeHook.keys,collapsed ]);

  return {onOpenChange, onMenuClick, keys};
}

const LeftMenu = ({ collapsed, routeHook, history, location }) => {
  const state = stateHook({ collapsed, routeHook, location, history });
  return (
    <Sider trigger={null} className="base-sider" collapsible collapsed={collapsed} >
      <div> LOGO </div>
      <Menu
        theme="dark" 
        mode="inline"
        {...state.keys}
        inlineCollapsed={collapsed}
        onOpenChange={state.onOpenChange}
        onClick = {state.onMenuClick}>
        {routeHook.menuChildren}
      </Menu>
    </Sider>
  );
}
export default withRouter(LeftMenu);
