import { Icon } from '@kunlunxu/brick';
import { IResourceItem } from '../../types';
import { useMemo, useCallback, memo, FC } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

import useResourceStore from '../../hooks/useResourceStore';
import useRemoveArticle from '../../hooks/useRemoveArticle';
import useRemoveFolder from '../../hooks/useRemoveFolder';
import useMoveModalStore from '../../hooks/useMoveModalStore';

interface IMoreProps {
  data: IResourceItem;
}

const More: FC<IMoreProps> = (props) => {
  const { data } = props;
  const isFolder = useMemo(() => !data.folder, [data.folder]);

  const { removeArticle } = useRemoveArticle();
  const { removeFolder } = useRemoveFolder();
  const { onOpen: openMoveModal } = useMoveModalStore();

  const {
    openFolder,
    createTmpFolder,
    createTmpArticle,
    updateArticle: updateArticleStore,
    updateFolder: updateFolderStore,
  } = useResourceStore();

  // 下拉菜单点击事件: 点击创建文件夹
  const handleCreateFolderMenu = useCallback(() => {
    if (isFolder) {
      openFolder(data.id); // 在文件夹上触发下拉框, 先打开文件夹
      createTmpFolder(data.id); // 创建临时文件夹
    } else {
      createTmpFolder(data.folder?.id!); // 创建临时文件夹
    }
  }, [isFolder, openFolder, data, createTmpFolder]);

  // 下拉菜单点击事件: 点击创建文章
  const handleCreateArticleMenu = useCallback(() => {
    if (isFolder) {
      openFolder(data.id); // 在文件夹上触发下拉框, 先打开文件夹
      createTmpArticle(data.id); // 创建临时文章
    } else {
      createTmpArticle(data.folder?.id!); // 在文章上触发下拉框
    }
  }, [createTmpArticle, isFolder, data, openFolder]);

  // 下拉菜单点击事件: 点击编辑
  const handleEditMenu = useCallback(() => {
    isFolder ? updateFolderStore({ id: data.id, editor: true }) : updateArticleStore({ id: data.id, editor: true });
  }, [isFolder, data.id, updateFolderStore, updateArticleStore]);

  // 下拉菜单点击事件: 移动
  const handleMoveMenu = useCallback(() => {
    openMoveModal(data);
  }, [openMoveModal, data]);

  // 下拉菜单点击事件: 点击删除
  const handleDeleteMenu = useCallback(async () => {
    isFolder ? removeFolder(data.id) : removeArticle(data.id);
  }, [data.id, isFolder, removeArticle, removeFolder]);

  // 标题 - 更多 - 下列菜单
  const moreMenu = useMemo(
    () =>
      [
        {
          conds: true,
          title: '创建文件夹',
          icon: 'icon-wenjianjia',
          onClick: handleCreateFolderMenu,
        },
        {
          conds: true,
          title: '创建文章',
          icon: 'icon-24',
          onClick: handleCreateArticleMenu,
        },
        {
          conds: true,
          title: '编辑',
          icon: 'icon-baocun',
          onClick: handleEditMenu,
        },
        {
          conds: true,
          title: '移动',
          icon: 'icon-baocun',
          onClick: handleMoveMenu,
        },
        {
          title: '删除',
          icon: 'icon-shanchu',
          onClick: handleDeleteMenu,
          conds: !isFolder || data.children?.length === 0, // TODO： 文件夹未展开, 是无效的
        },
      ].filter((v) => v.conds),
    [
      isFolder,
      handleEditMenu,
      handleMoveMenu,
      handleDeleteMenu,
      handleCreateFolderMenu,
      handleCreateArticleMenu,
      data.children?.length,
    ],
  );

  if (data.editor) {
    return null;
  }

  return (
    <Dropdown
      radius="sm"
      placement="bottom-end"
      className="bg-[#2c343a] text min-w-32 text-[#ccc]">
      <DropdownTrigger>
        <span className="py-3 pr-2 opacity-0 group-hover:opacity-100">
          <Icon type="icon-gengduo" />
        </span>
      </DropdownTrigger>
      <DropdownMenu aria-label="more">
        {moreMenu.map((item) => (
          <DropdownItem
            key={item.title}
            onPress={item.onClick}
            className="data-[hover=true]:bg-white/10 data-[hover=true]:text-[#ccc]">
            <span className="size-full flex items-center">
              <Icon
                type={item.icon}
                className="mr-1"
              />
              {item.title}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(More);
