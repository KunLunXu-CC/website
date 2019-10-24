import React, {
  useState,
  Fragment,
  useEffect, 
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import Operation from './Operation';
import { useStore } from '../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {

  // 初始化数据
  const initData = () => {
    store.tag.getTags();
  }

  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item) => {
      return item.type === 'tag' ? 
        <Menu.SubMenu 
          key={item.id} 
          title={
          <Fragment>
            <Icon type="icon-jiantou" className={scss['menu-arrow']}/>
            <Icon type="icon-wenjianjia"/>
            {item.name}
            <Icon type="icon-wenjianjia"/>
          </Fragment>}>
          {item.children.length !== 0 
            ? item.children.map(v => (recursion(v)))
            : <Menu.Item key={`${item.id}-empty`}>-----</Menu.Item>
          }
        </Menu.SubMenu> :
        <Menu.Item key={item.id}>{item.name}</Menu.Item>;
    }
    return store.menu.list.map(v => (recursion(v)))
  }

  // 选择项时
  const onSelect = (args) => {
    console.log('==>>> args', args);
  }

  useEffect(() => {
    initData();
  }, []);

  return { renderMenuList, onSelect };
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss['menu']}>
      <Scroll className={scss['menu-middle']}>
        <Menu
          mode="inline"
          inlineCollapsed={false}
          onSelect={state.onSelect}>
          {state.renderMenuList()}
        </Menu>
      </Scroll>
      <Operation />
    </div>
  ));
}
