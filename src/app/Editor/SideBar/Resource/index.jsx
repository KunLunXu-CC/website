import React from 'react';
import Title from './Title';
import Footer from './Footer';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { VariableContainer } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const INLINE_INDENT = 14;  // 菜单缩进大小
const MENU_MIN_WIDTH = 4;  // 菜单最小宽度

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
      id: v.id,
      type: 'tag',
      name: v.name,
      editor: v.editor,
      parent: v.parent?.id,
    })), 'name');
    const loop = list => list.forEach(parent => {
      if (!side.openKeys.includes(parent.id)) {
        parent.children = []; // eslint-disable-line
      } else {
        parent.children = [ // eslint-disable-line
          ... _.sortBy((groupTags[parent.id] || []).map(v => ({
            id: v.id,
            type: 'tag',
            name: v.name,
            editor: v.editor,
            parent: parent.id,
          })), 'name'),
          ... _.sortBy((groupArticles[parent.id] || []).map(v => ({
            id: v.id,
            name: v.name,
            tag: parent.id,
            type: 'article',
            editor: v.editor,
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
  const onSelect = ({ key: article }) => {
    dispatch({ type: 'editor/appendWorks', article });
  };

  // 工作区尺寸变化
  const onResize = React.useCallback(({ width }) => {
    dispatch({
      type: 'editor/setSide',
      side: { collapsed: MENU_MIN_WIDTH === width },
    });
  }, []);

  // SubMenu 展开/关闭的回调
  const onOpenChange = openKeys => {
    dispatch({
      type: 'editor/setSide',
      side: { openKeys },
    });
  };

  return {
    side,
    onResize,
    onSelect,
    selectedKeys,
    onOpenChange,
    renderMenuList,
  };
};

export default () => {
  const state = useStateHook();

  return (
    <VariableContainer
      className={scss.side}
      margin={{ right: '20%' }}
      operationList={['right']}
      onResize={state.onResize}
      style={{ height: '100%' }}
      constraintSize={{ width: MENU_MIN_WIDTH }}>
      {!state.side.collapsed ?
        <div className={scss.body}>
          <Menu
            mode="inline"
            inlineCollapsed={false}
            onSelect={state.onSelect}
            inlineIndent={INLINE_INDENT}
            openKeys={state.side.openKeys}
            onOpenChange={state.onOpenChange}
            selectedKeys={[state.selectedKeys]}>
            {state.renderMenuList()}
          </Menu>
          <Footer/>
        </div> : null
      }
    </VariableContainer >
  );
};
