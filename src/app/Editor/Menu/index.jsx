import React, { 
  useState,
  useEffect, 
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  useEffect(() => {

  }, []);
  return {};
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return useObserver(() => (
    <div className={scss['menu']}>
      <Scroll className={scss['menu-middle']}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['all']}
          inlineCollapsed={false}>

          <Menu.SubMenu key="1" title="Submenu">
            <Menu.Item key="1-1">Option 1-1</Menu.Item>
            <Menu.Item key="1-2">Option 1-2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="2" title="Submenu">
            <Menu.Item key="2-1">Option 2-1</Menu.Item>
            <Menu.Item key="2-2">Option 2-2</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item>
            <Icon type="icon-wenjianjia"  className="anticon"/>
            <span>JS</span>
          </Menu.Item>
        </Menu>
      </Scroll>
    </div>
  ));
}
