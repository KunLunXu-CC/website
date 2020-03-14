import React, {
  useMemo,
} from 'react';
import MenuTitle from './MenuTitle';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { Icon, Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const INLINE_INDENT = 14;  // 菜单缩进大小

const useStateHook = () => {
  const dispatch = useDispatch();

  const { articles, tags, menu, works } = useSelector(state => ({
    menu: _.get(state, 'editor.menu'),
    tags: _.get(state, 'editor.tags'),
    works: _.get(state, 'editor.works'),
    articles: _.get(state, 'editor.articles'),
  }));

  // 菜单树形数据
  const treeData = useMemo(() => {
    const groupTags = _.groupBy(Object.values(tags), 'parent.id');
    const groupArticles = _.groupBy(Object.values(articles), 'tags[0].id');
    const parents = _.sortBy((groupTags.null || []).map(v => ({
      id: v.id,
      type: 'tag',
      name: v.name,
      parent: v.parent.id,
    })), 'name');
    const loop = list => list.forEach(parent => {
      if (!menu.openKeys.includes(parent.id)) {
        parent.children = []; // eslint-disable-line
      } else {
        parent.children = _.sortBy([ // eslint-disable-line
          ... (groupTags[parent.id] || []).map(v => ({
            id: v.id,
            type: 'tag',
            name: v.name,
            parent: parent.id,
          })),
          ... (groupArticles[parent.id] || []).map(v => ({
            id: v.id,
            name: v.name,
            tag: parent.id,
            type: 'article',
            parent: parent.id,
          })),
        ], 'name');
        parent.children.length !== 0 && loop(parent.children);
      }
    });
    loop(parents);
    return parents;
  }, [articles, tags, menu.openKeys]);

  const selectedKeys = useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item, index) => (
      item.type === 'tag' ?
        <Menu.SubMenu
          key={item.id}
          title={<MenuTitle data={item}/>}>
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
          <MenuTitle data={item}/>
        </Menu.Item>
    );
    return treeData.map(v => (recursion(v, 1)));
  };

  // 点击菜单项
  const onSelect = ({ key: article }) => {
    dispatch({ type: 'editor/appendWorks', article });
  };

  // 添加 tag
  const addTag = () => {
    dispatch({ type: 'editor/createFictitiousTag', parent: {} });
  };

  // SubMenu 展开/关闭的回调
  const onOpenChange = openKeys => {
    dispatch({
      type: 'editor/setMenu',
      menu: { openKeys },
    });
  };

  return {
    menu,
    addTag,
    onSelect,
    selectedKeys,
    onOpenChange,
    renderMenuList,
  };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      <Scroll className={scss['menu-middle']}>
        <Menu
          mode="inline"
          inlineCollapsed={false}
          onSelect={state.onSelect}
          inlineIndent={INLINE_INDENT}
          openKeys={state.menu.openKeys}
          onOpenChange={state.onOpenChange}
          selectedKeys={[state.selectedKeys]}>
          {state.renderMenuList()}
        </Menu>
      </Scroll>
      <div
        onClick={state.addTag}
        className={scss['munu-new-tag']} >
        <Icon type="icon-xinzeng" />
      </div>
    </div>
  );
};
