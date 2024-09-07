import Title from './Title';
import scss from './index.module.scss';
import useResourceStore from '../../hooks/useResourceStore';
import useWorkspaceStore from '../../hooks/useWorkspaceStore';

import { Menu } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import { cloneDeep, groupBy, sortBy } from 'lodash';

const INLINE_INDENT = 14; // 菜单缩进大小

const Resource = () => {
  const { workspaces, appendArticleWorkspace } = useWorkspaceStore();
  const { folders, articles, setOpenFolders, openFolders, createTmpFolder } = useResourceStore();

  // 菜单
  const treeData = useMemo(() => {
    const cloneFolders = cloneDeep(Object.values(folders));
    const cloneArticles = cloneDeep(Object.values(articles));
    const groupFolders = groupBy(cloneFolders, 'parent.id');
    const groupArticles = groupBy(cloneArticles, 'folder.id');

    cloneFolders.forEach((v) => {
      const tagLength = groupFolders[v.id]?.length ?? 0;
      const articleLength = groupArticles[v.id]?.length ?? 0;
      v.childrenLength = tagLength + articleLength; // eslint-disable-line
      v.children = openFolders.includes(v.id)
        ? [
            // eslint-disable-line
            ...sortBy(groupFolders[v.id] || [], 'name'),
            ...sortBy(groupArticles[v.id] || [], 'name'),
          ]
        : [];
    });

    return sortBy(
      cloneFolders.filter((v) => !v.parent?.id),
      'name',
    );
  }, [articles, folders, openFolders]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = useMemo(() => {
    const selectedKey = workspaces.find((v) => v.active)?.dataId;
    return selectedKey ? [selectedKey] : [];
  }, [workspaces]);

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
        style: { '--dividing-left': `${level * INLINE_INDENT + 15}px` },
        children: item?.children?.length
          ? item.children.map((v) => recursion(v, level + 1))
          : [{ key: `${item.id}-empty`, className: scss['menu-item-empty'] }],
      };
    };

    return treeData.map((v) => recursion(v, 1));
  }, [treeData]);

  const handleAdd = useCallback(() => {
    createTmpFolder(null);
  }, [createTmpFolder]);

  return (
    <>
      <Menu
        items={menu}
        mode="inline"
        className={scss.menu}
        inlineCollapsed={false}
        openKeys={openFolders}
        inlineIndent={INLINE_INDENT}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenFolders}
        onSelect={({ key }) => appendArticleWorkspace(key)}
      />
      <div
        onClick={handleAdd}
        className={scss.add}>
        +
      </div>
    </>
  );
};
export default memo(Resource);
