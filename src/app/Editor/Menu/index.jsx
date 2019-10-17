import React, {
  useState,
  Fragment,
  useEffect, 
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

const data = [
  { name: 'JS', id: 'id-js', children: [
    { name: 'JS1', id: 'id-js1' },
    { name: 'JS2', id: 'id-js2' },
    { name: 'JS3', id: 'id-js3' },
  ]},
  { name: 'CSS', id: 'id-css', children: [
    { name: 'CSS1', id: 'id-css1'},
    { name: 'CSS2', id: 'id-css2'},
    { name: 'CSS3', id: 'id-css3'},
    { name: 'CSS4', id: 'id-css4'},
  ]},
];

const useStateHook = (props, store) => {

  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item) => {
      const { name, children, id } = item;
      return children ? 
        <Menu.SubMenu key={id} title={<div>
          <Icon type="icon-jiantou" className={scss['menu-arrow']}/>
          <Icon type="icon-wenjianjia"/>{name}</div>}>
          {children.map(v => (recursion(v)))}
        </Menu.SubMenu> :
        <Menu.Item key={id}>{name}</Menu.Item>;
    }
    return data.map(v => (recursion(v)))
  }

  // 选择项时
  const onSelect = (args) => {
    console.log('==>>> args', args);
  }

  useEffect(() => {
    
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
          multiple
          mode="inline"
          inlineCollapsed={false}
          onSelect={state.onSelect}>
          {state.renderMenuList()}
        </Menu>
      </Scroll>
    </div>
  ));
}
