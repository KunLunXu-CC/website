import React, { useState } from 'react';
import { Icon, Scroll } from 'qyrc';
import { Menu } from 'antd';
import scss from './index.module.scss';

const useStateHook = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  return { toggleCollapsed, collapsed };
}

export default (props) => {
  const state = useStateHook(props);

  return (
    <div className={scss['tags']}>
      <Scroll className={scss['tags-middle']}>
        <Menu
          mode="inline"
          inlineCollapsed={state.collapsed}>
          {new Array(20).fill(0).map((v, index) => (
            <Menu.Item key={`${index}`}>
              <Icon type="icon-iconzhankai" className="anticon"/>
              <span>Option 1111111111111111111111111111111</span>
            </Menu.Item>
          ))}
        </Menu>
      </Scroll>
      <div className={scss['tags-bottom']} onClick={state.toggleCollapsed}>
        <Icon className="anticon" type="icon-iconzhankai" />
      </div>
    </div>
  );
}
