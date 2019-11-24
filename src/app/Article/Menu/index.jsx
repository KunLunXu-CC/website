import React, {
  useEffect,
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  useEffect(() => {
    store.menu.getList();
  }, [store]);

  return {};
};

export default props => {
  const store = useStore();
  useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.tags}>
      <Scroll className={scss['tags-middle']}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['all']}
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
