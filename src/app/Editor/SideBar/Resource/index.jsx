import React from 'react';
import Title from './Title';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const INLINE_INDENT = 14;  // 菜单缩进大小

const useStateHook = () => {
  const dispatch = useDispatch();
  const {
    tags,
    side,
    works,
    articles,
  } = useSelector(state => ({
    side: state.editor.side,
    tags: state.editor.tags,
    works: state.editor.works,
    articles: state.editor.articles,
  }));

  // 菜单树形数据
  const treeData = React.useMemo(() => {
    const groupTags = _.groupBy(Object.values(tags), 'parent.id');
    const groupArticles = _.groupBy(articles, 'tags[0].id');
    const parents = _.sortBy((groupTags.undefined || []).map(v => ({
      ... v,
      type: 'tag',
      parent: v.parent?.id,
    })), 'name');
    const loop = list => list.forEach(parent => {
      if (!side.openKeys.includes(parent.id)) {
        parent.children = []; // eslint-disable-line
      } else {
        parent.children = [ // eslint-disable-line
          ... _.sortBy((groupTags[parent.id] || []).map(v => ({
            ... v,
            type: 'tag',
            parent: parent.id,
          })), 'name'),
          ... _.sortBy((groupArticles[parent.id] || []).map(v => ({
            ... v,
            tag: parent.id,
            type: 'article',
            parent: parent.id,
          })), 'name'),
        ];
        parent.children.length !== 0 && loop(parent.children);
      }
    });
    loop(parents);
    return parents;
  }, [articles, tags, side.openKeys]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = React.useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item, level) => {
      const title = <Title data={item}/>;
      return (
        item.type === 'tag' ?
          <Menu.SubMenu key={item.id} title={title}>
            {item.children.length !== 0 ?
              item.children.map(v => (recursion(v, level + 1))) :
              <Menu.Item className={scss['menu-item-empty']}/>
            }
            <div
              className={scss['menu-dividing']}
              style={{ left: `${(level * INLINE_INDENT) + 12}px` }}
            />
          </Menu.SubMenu> :
          <Menu.Item key={item.id}>{title}</Menu.Item>
      );
    };
    return treeData.map(v => (recursion(v, 1)));
  };

  // 点击菜单项
  const onSelect = ({ key: article }) => dispatch({
    article,
    type: 'editor/appendWorks',
  });

  // SubMenu 展开/关闭的回调
  const onOpenChange = openKeys => dispatch({
    type: 'editor/setSide',
    side: { openKeys },
  });

  return {
    side,
    onSelect,
    selectedKeys,
    onOpenChange,
    renderMenuList,
  };
};

export default () => {
  const state = useStateHook();
  return (
    <Menu
      mode="inline"
      className={scss.menu}
      inlineCollapsed={false}
      onSelect={state.onSelect}
      inlineIndent={INLINE_INDENT}
      openKeys={state.side.openKeys}
      onOpenChange={state.onOpenChange}
      selectedKeys={[state.selectedKeys]}>
      {state.renderMenuList()}
    </Menu>
  );
};
