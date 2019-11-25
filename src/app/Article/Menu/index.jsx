import React, {
  useEffect,
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  // 点击菜单
  const onClickMenu = ({ key }) => {
    store.menu.setTag(key);
  };

  useEffect(() => {
    store.menu.getList();
  }, [store]);

  return { onClickMenu };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.tags}>
      <Scroll className={scss['tags-middle']}>
        <Menu
          mode="inline"
          onClick={state.onClickMenu}
          selectedKeys={[store.menu.tag]}
          inlineCollapsed={store.menu.collapsed}>
          {store.menu.list.map(v => (
            <Menu.Item key={v.id}>
              <Icon type={v.icon}  className="anticon"/>
              <span>{v.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Scroll>
    </div>
  ));
};
