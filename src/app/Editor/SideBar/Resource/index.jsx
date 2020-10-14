import React from 'react';
import Title from './Title';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { DATASETSFROM_CODE } from '@config/consts';
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
    tags: state.editor.tags,
    side: state.editor.side,
    works: state.editor.works,
    articles: state.editor.articles,
  }));

  // 菜单
  const treeData = React.useMemo(() => {
    const cloneTags = _.cloneDeep(Object.values(tags));
    const groupTags = _.groupBy(cloneTags, 'parent.id');
    const groupArticles = _.groupBy(articles, 'tags[0].id');
    cloneTags.forEach(v => (
      v.children = side.openKeys.includes(v.id) ? [ // eslint-disable-line
        ... _.sortBy(groupTags[v.id] || [], 'name'),
        ... _.sortBy(groupArticles[v.id] || [], 'name'),
      ] : []
    ));
    return cloneTags.filter(
      v => v.code === DATASETSFROM_CODE.ARTICLE_TYPE.VALUE
    );
  }, [articles, tags, side.openKeys]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = React.useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 渲染菜单列表
  const menu = React.useMemo(() => {
    let root = null;   // 根节点
    const recursion = (item, level) => {
      level === 1 && (root = item);
      const title = <Title data={item} root={root} level={level}/>;
      return (
        !item.tags ?  // 非文章
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
  }, [treeData]);

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
    menu,
    onSelect,
    selectedKeys,
    onOpenChange,
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
      {state.menu}
    </Menu>
  );
};
