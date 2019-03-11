import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

// 状态提取
const stateHook = ({ routeHook, location, history, collapsed }) => {

  useEffect(() => {
    routeHook.setPathname(location.pathname);
  }, [location.pathname]);

  // 点击菜单栏： 路由跳转
  const onMenuClick = ({ item, key, keyPath }) => {
    history && history.push(item.props.link || key);
  }

  // 展开子菜单： 设置 routeHook.keys
  const onOpenChange = (openKeys) => {
    routeHook.setKeys({ ...routeHook.keys, openKeys });
  }

  // 处理 keys： 在菜单收起的情况下（collapsed = true）不应该设置 openKeys 
  const keys = useMemo(() => {
    const values = { selectedKeys: routeHook.keys.selectedKeys };
    !collapsed && (values.openKeys = routeHook.keys.openKeys);
    return values;
  }, [routeHook.keys, collapsed ]);

  return {onOpenChange, onMenuClick, keys};
}

const LeftMenu = (props) => {
  const state = stateHook(props);
  return (
    <Sider 
      collapsible 
      trigger={null} 
      className="base-sider" 
      collapsed={props.collapsed} 
    >
      <div> LOGO </div>
      <Menu
        theme="dark" 
        mode="inline"
        {...state.keys}
        onClick = {state.onMenuClick}
        inlineCollapsed={props.collapsed}
        onOpenChange={state.onOpenChange}>
        {props.routeHook.menuChildren}
      </Menu>
    </Sider>
  );
}
export default withRouter(LeftMenu);
