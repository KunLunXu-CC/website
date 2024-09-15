import Title from './Title';
import scss from './index.module.scss';
import useResourceStore from '../../hooks/useResourceStore';
import useWorkspaceStore from '../../hooks/useWorkspaceStore';

import { Menu, MenuProps } from 'antd';
import { IResourceItem } from '../../types';
import { NEW_FLAG_ID } from '../../constants';
import { cloneDeep, groupBy, sortBy } from 'lodash';
import { memo, useCallback, useMemo, CSSProperties } from 'react';

const INLINE_INDENT = 14; // 菜单缩进大小

type MenuItem = Required<MenuProps>['items'][number];
type MenuSelectEventHandler = Required<MenuProps>['onSelect'];

const Resource = () => {
  const { workspaces, appendArticleWorkspace } = useWorkspaceStore();
  const { folders, articles, setOpenFolderIds, openFolderIds, createTmpFolder } = useResourceStore();

  // 菜单
  const treeData = useMemo(() => {
    const cloneFolders = cloneDeep(Object.values(folders));
    const cloneArticles = cloneDeep(Object.values(articles));
    const groupFolders = groupBy(cloneFolders, 'parent.id') as Record<string, IResourceItem[]>;
    const groupArticles = groupBy(cloneArticles, 'folder.id') as Record<string, IResourceItem[]>;

    (cloneFolders as IResourceItem[]).forEach((v) => {
      const tagLength = groupFolders[v.id as string]?.length ?? 0;
      const articleLength = groupArticles[v.id as string]?.length ?? 0;

      v.childrenLength = tagLength + articleLength; // eslint-disable-line
      v.children = openFolderIds.includes(v.id as string)
        ? [
            // eslint-disable-line
            ...sortBy(groupFolders[v.id as string] || [], 'name'),
            ...sortBy(groupArticles[v.id as string] || [], 'name'),
          ]
        : [];
    });

    return sortBy(
      cloneFolders.filter((v) => !v.parent?.id),
      'name',
    ) as IResourceItem[];
  }, [articles, folders, openFolderIds]);

  // 当前选中项菜单 key 值: 也是当前活动工作区的 article id
  const selectedKeys = useMemo(() => {
    const selectedKey = workspaces.find((v) => v.active)?.dataId;
    return selectedKey ? [selectedKey] : [];
  }, [workspaces]);

  // 渲染菜单列表
  const menu = useMemo(() => {
    const recursion = (item: IResourceItem, level: number): MenuItem => {
      const title = <Title data={item} />;

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
        style: { '--dividing-left': `${level * INLINE_INDENT + 15}px` } as CSSProperties,
        children: item?.children?.length
          ? item.children.map((v: IResourceItem) => recursion(v, level + 1))
          : [{ key: `${item.id}-empty`, className: scss['menu-item-empty'] }],
      };
    };

    return treeData.map((v: IResourceItem) => recursion(v, 1));
  }, [treeData]);

  const handleAdd = useCallback(() => {
    createTmpFolder(null);
  }, [createTmpFolder]);

  const handleSelect = useCallback<MenuSelectEventHandler>(
    ({ key }) => {
      if (key === NEW_FLAG_ID) return;

      appendArticleWorkspace(key);
    },
    [appendArticleWorkspace],
  );

  return (
    <>
      <Menu
        items={menu}
        mode="inline"
        className={scss.menu}
        inlineCollapsed={false}
        onSelect={handleSelect}
        openKeys={openFolderIds}
        inlineIndent={INLINE_INDENT}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenFolderIds}
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
