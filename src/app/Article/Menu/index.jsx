import React, {
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 点击菜单
  const onClickMenu = ({ key: tag }) => {
    const search = { tag };
    dispatch({ type: 'article/setSearch', search });
    dispatch({ type: 'article/getArticles', search });
  };

  // 所有菜单
  const { menus, tag } = useSelector(
    state => ({
      menus: _.get(state, 'article.menus'),
      tag: _.get(state, 'article.search.tag'),
    })
  );

  useEffect(() => {
    dispatch({ type: 'article/getMenus' });
  }, []);

  return { onClickMenu, menus, tag };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.tags}>
      <Scroll className={scss['tags-middle']}>
        <Menu
          mode="inline"
          selectedKeys={[state.tag]}
          onClick={state.onClickMenu}>
          {state.menus.map(v => (
            <Menu.Item key={v.id}>
              <Icon type={v.icon || 'icon-weizhi'}  className="anticon"/>
              <span>{v.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Scroll>
    </div>
  );
};
