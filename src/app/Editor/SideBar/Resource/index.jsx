import Title from './Title';
import scss from './index.module.scss';

import { Menu } from 'antd';
import { actions } from '@store';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const INLINE_INDENT = 14;  // 菜单缩进大小

export default () => {
  const dispatch = useDispatch();

  const {
    folders,
    side,
    works,
    articles,
    selectKey,
  } = useSelector((state) => ({
    folders: state.editor.folders,
    side: state.editor.side,
    works: state.editor.works,
    articles: state.editor.articles,
    selectKey: state.editor.activity.selectKey,
  }));

  // 菜单
  const treeData = useMemo(() => {
    const cloneFolders = _.cloneDeep(Object.values(folders));
    const cloneArticles = _.cloneDeep(Object.values(articles));
    const groupFolders = _.groupBy(cloneFolders, 'parent.id');

    const groupArticles = _.groupBy(cloneArticles.reduce((total, ele) => {
      // 根据状态来过滤数据
      (!_.isNumber(selectKey) || ele.status === selectKey) && total.push({
        ...ele,
      });

      return total;
    }, []), 'folder.id');

    cloneFolders.forEach((v) => {
      const tagLength = groupFolders[v.id]?.length ?? 0;
      const articleLength = groupArticles[v.id]?.length ?? 0;
      v.childrenLength = tagLength + articleLength; // eslint-disable-line
      v.children = side.openKeys.includes(v.id) ? [ // eslint-disable-line
        ..._.sortBy(groupFolders[v.id] || [], 'name'),
        ..._.sortBy(groupArticles[v.id] || [], 'name'),
      ] : [];
    });

    return _.sortBy(cloneFolders.filter((v) => !v.parent?.id), 'name');
  }, [articles, folders, side.openKeys, selectKey]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = useMemo(() => (
    works.find((v) => v.active)?.articleId
  ), [works]);

  // 渲染菜单列表
  const menu = useMemo(() => {
    const recursion = (item, level) => {
      const title = (
        <Title
          data={item}
          level={level}
        />
      );

      // 文章
      if (item.folder) {
        return {
          label: title,
          key: item.id,
        };
      }

      // 目录
      return {
        label: title,
        key: item.id,
        style: { '--dividing-left': `${(level * INLINE_INDENT) + 15}px` },
        children: item?.children?.length
          ? item.children.map((v) => (recursion(v, level + 1)))
          : [{ key: `${item.id}-empty`, className: scss['menu-item-empty'] }],
      };
    };

    return treeData.map((v) => (recursion(v, 1)));
  }, [treeData]);

  // 点击菜单项
  const handleSelect = useCallback(({ key: articleId }) => {
    dispatch(actions.editor.appendWorks(articleId));
  }, [dispatch]);

  // SubMenu 展开/关闭的回调
  const handleOpenChange = useCallback((openKeys) => {
    dispatch(actions.editor.setSide({ openKeys }));
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    dispatch(actions.editor.createTmpFolder(null));
  }, [dispatch]);

  return (
    <>
      <Menu
        items={menu}
        mode="inline"
        className={scss.menu}
        onSelect={handleSelect}
        inlineCollapsed={false}
        openKeys={side.openKeys}
        inlineIndent={INLINE_INDENT}
        selectedKeys={[selectedKeys]}
        onOpenChange={handleOpenChange}
      />
      <div
        onClick={handleAdd}
        className={scss.add}>
        +
      </div>
    </>
  );
};
