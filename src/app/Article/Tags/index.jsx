import React from 'react';
import { Icon } from 'qyrc';
import { Menu } from 'antd';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['tags']}>
      <Menu 
        style={{ width: 150 }}
        inlineCollapsed={false}>
        <Menu.Item key="1">
          <Icon type="icon-all" />
          <span>Option 1111111111111111111111111111111</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="icon-all" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="icon-all" />
          <span>Option 1</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="icon-all" />
          <span>Option 1</span>
        </Menu.Item>
      </Menu>
    </div>
  );
}
