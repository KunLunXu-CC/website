import React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

export default ({ collapsed, toggleCollapsed }) =>{
  return (
    <Header className="base-header po">
      <Icon 
        className="trigger f18 plrw cp"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapsed}
      />
    </Header>
  );
}
