import React from 'react';
import { Menu } from 'antd';
import { Scroll, Icon } from 'qyrc';
import { TagMenu } from '@components';
import { useObserver } from 'mobx-react-lite';
import scss from './index.module.scss';
import { useStore } from '../store';

// 获取所有根级节点
const getRootChildren = (data = []) => (data.filter(
  item => (!data.find(v => v.parent === item.id)
)));

const useStateHook = (props, store) => {
  const onClick = ({ key }) => {
    store.setTag(key);
  }

  return { onClick };
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return useObserver(() => (
    <Scroll className={scss['side']}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={state.onClick}
        defaultSelectedKeys={['all']}
        style={{ width: '100%', minHeight: '100%' }}
      >
        {getRootChildren(store.tagList).map( v => (
          <Menu.Item key={v.id}>
            <Icon type={v.icon} title={v.name}/>
          </Menu.Item>
        ))}
      </Menu>
    </Scroll>
  ));
};
