import React from 'react';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';
import { PHOTO_TYPE } from '@config/consts';
import { useStore } from '../../store';

const DEFAULT_TYPE = 'all';

// 菜单列表数据
const listData = [
  {
    name: '所有',
    icon: 'icon-all',
    key: DEFAULT_TYPE,
  },
  {
    icon: 'icon-24',
    name: PHOTO_TYPE.ARTICLE.DESC,
    key: PHOTO_TYPE.ARTICLE.VALUE,
  },
  {
    icon: 'icon-touxiang',
    name: PHOTO_TYPE.AVATAR.DESC,
    key: PHOTO_TYPE.AVATAR.VALUE,
  },
  {
    key: PHOTO_TYPE.THUMB.VALUE,
    name: PHOTO_TYPE.THUMB.DESC,
    icon: 'icon-genghuanfengmian',
  },
  {
    name: PHOTO_TYPE.DESKTOP.DESC,
    key: PHOTO_TYPE.DESKTOP.VALUE,
    icon: 'icon-yunzhuomian-shouye',
  },
];

const useStateHook = (props, store) => {
  // 菜单点击事件
  const onClick = ({ key }) => {
    store.photos.toggleType(key !== DEFAULT_TYPE ? Number(key) : key);
  };

  return { onClick };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.menu}>
      <Menu
        mode="inline"
        onClick={state.onClick}
        selectedKeys={[`${store.photos.type}`]}>
        {listData.map(value => (
          <Menu.Item key={`${value.key}`}>
            <Icon type={value.icon}  className="anticon"/>
            <span>{value.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  ));
};
