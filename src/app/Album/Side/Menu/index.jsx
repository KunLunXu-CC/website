import React, { 
  useState,
  useEffect, 
} from 'react';
import { Menu } from 'antd';
import { Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';

// 菜单列表数据
const listData = [
  { key: 'all', name: '所有', icon: 'icon-all' },
  { key: 'article', name: '文章', icon: 'icon-24' },
  { key: 'cover', name: '封面', icon: 'icon-icon-test' },
  { key: 'desktop', name: '桌面背景', icon: 'icon-yunzhuomian-shouye' },
];

const useStateHook = (props, store) => {
  return {};
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return useObserver(() => (
    <div className={scss['menu']}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['all']}>
        {listData.map( v => (
          <Menu.Item key={v.key}>
            <Icon type={v.icon}  className="anticon"/>
            <span>{v.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  ));
}
