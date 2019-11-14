import React, {
  useEffect,
} from 'react';
import { Menu } from 'antd';
import { Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';
import { PHOTO_TYPE } from '@config/consts';
import { useStore } from '../../store';
import scss from './index.module.scss';

const DEFAULT_TYPE = 'all';

// 菜单列表数据
const listData = [
  {
    name: '所有',
    icon: 'icon-all',
    key: DEFAULT_TYPE,
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

const useStateHook = (props, store) => {
  // 菜单点击事件
  const onClick = ({ key }) => {
    store.photos.toggleType(key !== DEFAULT_TYPE ? Number(key) : key);
  };

  useEffect(() => {
    store.photos.toggleType(DEFAULT_TYPE);
  }, [store.photos]);

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
