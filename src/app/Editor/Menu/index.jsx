import React, {
  useEffect,
} from 'react';
import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import MenuTitle from './MenuTitle';
import { useStore } from '../store';
import scss from './index.module.scss';

const INLINE_INDENT = 14;  // 菜单缩进大小

const useStateHook = (props, store) => {
  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item, index) => (
      item.type === 'tag' ?
        <Menu.SubMenu
          key={item.id}
          title={<MenuTitle data={item} type="subMenu"/>}>
          {item.children.length !== 0 ?
            item.children.map(v => (recursion(v, index + 1))) :
            <Menu.Item
              key={`${item.id}-empty`}
              className={scss['menu-item-empty']}
            />
          }
          <div
            className={scss['menu-dividing']}
            style={{ left: `${(index * INLINE_INDENT) + 12}px` }}
          />
        </Menu.SubMenu> :
        <Menu.Item key={item.id}>
          <MenuTitle data={item} type="item"/>
        </Menu.Item>
    );
    return store.menu.list.map(v => (recursion(v, 1)));
  };

  // 选择项时
  const onSelect = ({ key }) => {
    store.article.open(key);
    store.menu.toggleSelected(key);
  };

  // 添加 tag
  const addTag = () => {
    store.tag.createFictitiousTag();
  };

  // SubMenu 展开/关闭的回调
  const onOpenChange = openKeys => {
    store.menu.onOpenChange(openKeys);
  };

  useEffect(() => {
    store.tag.getTags();
    store.article.getArticles();
  }, [store]);

  return { renderMenuList, onSelect, onOpenChange, addTag };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.menu}>
      <Scroll className={scss['menu-middle']}>
        <Menu
          mode="inline"
          inlineCollapsed={false}
          onSelect={state.onSelect}
          inlineIndent={INLINE_INDENT}
          openKeys={store.menu.openKeys}
          onOpenChange={state.onOpenChange}
          selectedKeys={[store.menu.selected]}>
          {state.renderMenuList()}
        </Menu>
      </Scroll>
      <div
        onClick={state.addTag}
        className={scss['munu-new-tag']} >
        <Icon type="icon-xinzeng" />
      </div>
    </div>
  ));
};
