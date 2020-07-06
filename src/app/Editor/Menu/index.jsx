import React, {
  useMemo,
  useCallback,
} from 'react';
import MenuTitle from './MenuTitle';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { ARTICLE_STATUS } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Scroll, VariableContainer } from 'qyrc';

const INLINE_INDENT = 14;  // 菜单缩进大小
const MENU_MIN_WIDTH = 4; // 菜单最小宽度

const useStateHook = () => {
  const dispatch = useDispatch();

  const {
    tags,
    menu,
    works,
    articles,
    selectMenuKey,
  } = useSelector(state => ({
    menu: state.editor.menu,
    tags: state.editor.tags,
    works: state.editor.works,
    articles: state.editor.articles,
    selectMenuKey: state.editor.side.selectMenuKey,
  }));

  // 获取文章
  const articleList = useMemo(() => (
    Object.values(ARTICLE_STATUS).includes(selectMenuKey)
      ? Object.values(articles).filter(v => v.status === selectMenuKey)
      : Object.values(articles)
  ), [articles, selectMenuKey]);

  // 菜单树形数据
  const treeData = useMemo(() => {
    const groupTags = _.groupBy(Object.values(tags), 'parent.id');
    const groupArticles = _.groupBy(articleList, 'tags[0].id');
    const parents = _.sortBy((groupTags.null || []).map(v => ({
      id: v.id,
      type: 'tag',
      name: v.name,
      editor: v.editor,
      parent: v.parent.id,
    })), 'name');
    const loop = list => list.forEach(parent => {
      if (!menu.openKeys.includes(parent.id)) {
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
  }, [articleList, tags, menu.openKeys]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 渲染菜单列表
  const renderMenuList = () => {
    const recursion = (item, index) => {
      const title = <MenuTitle data={item}/>;
      return (
        item.type === 'tag' ?
          <Menu.SubMenu key={item.id} title={title}>
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
          <Menu.Item key={item.id}>{title}</Menu.Item>
      );
    };
    return treeData.map(v => (recursion(v, 1)));
  };

  // 点击菜单项
  const onSelect = ({ key: article }) => {
    dispatch({ type: 'editor/appendWorks', article });
  };


  const onResize = useCallback(({ width }) => {
    dispatch({
      type: 'editor/setMenu',
      menu: { collapsed: MENU_MIN_WIDTH === width },
    });
  }, []);

  // 添加 tag
  const addTag = () => {
    dispatch({ type: 'editor/createFictitiousTag', parent: null });
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
      className={scss.menu}
      margin={{ right: '20%' }}
      operationList={['right']}
      onResize={state.onResize}
      style={{ height: '100%' }}
      constraintSize={{ width: MENU_MIN_WIDTH }}>
      {!state.menu.collapsed ?
        <div className={scss.body}>
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
        </div> : null
      }
    </VariableContainer >
  );
};
