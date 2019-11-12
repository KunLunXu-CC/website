import React from 'react';
import { Menu } from 'antd';
import { Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { PHOTO_TYPE } from '@config/consts';
// import { useStore } from '../../store';
import scss from './index.module.scss';

// 菜单列表数据
const listData = [
  {
    key: 'all',
    name: '所有',
    icon: 'icon-all',
  },
  {
    name: '文章',
    icon: 'icon-24',
    key: PHOTO_TYPE.ARTICLE.VALUE,
  },
  {
    name: '封面',
    key: PHOTO_TYPE.COVER.VALUE,
    icon: 'icon-genghuanfengmian',
  },
  {
    name: '桌面背景',
    key: PHOTO_TYPE.DESKTOP.VALUE,
    icon: 'icon-yunzhuomian-shouye',
  },
];

// const useStateHook = () => {
//   return {};
// }

export default () => useObserver(() => (
  <div className={scss.menu}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['all']}>
      {listData.map(value => (
        <Menu.Item key={value.key}>
          <Icon type={value.icon}  className="anticon"/>
          <span>{value.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  </div>
));

