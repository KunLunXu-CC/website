import React, { useMemo } from 'react';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { Icon } from '@kunlunxu/brick';
import { PHOTO_TYPE } from '@config/consts';
import { useSelector, useDispatch } from 'react-redux';

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

export default () => {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.album?.search?.type);

  // 菜单点击事件
  const onClick = ({ key }) => {
    dispatch({
      type: 'album/setSearch',
      search: { type: key },
    });
    dispatch({
      type: 'album/getPhotos',
      search: { type: key },
    });
  };

  const items = useMemo(() => listData.map((value) => ({
    key: value.key,
    label: (
      <>
        <Icon type={value.icon} />
        {value.name}
      </>
    ),
  })), []);

  return (
    <div className={scss.menu}>
      <Menu
        mode="inline"
        items={items}
        onClick={onClick}
        selectedKeys={[`${type}`]}
      />
    </div>
  );
};
