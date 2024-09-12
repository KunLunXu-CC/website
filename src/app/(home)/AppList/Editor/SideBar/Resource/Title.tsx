import scss from './title.module.scss';

import { Dropdown } from 'antd';
import { actions } from '@/store';
import { MOVE } from '../../constants';
import { Icon } from '@kunlunxu/brick';
import { Input } from '@nextui-org/react';
import { ARTICLE_STATUS } from '@/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useCallback, KeyboardEvent, memo, FocusEvent } from 'react';
import {
  useHandleUpdateFolders,
  useHandleUpdateArticles,
  useHandleCreateArticles,
  useHandleRemoveFolders,
  useHandleRemoveArticles,
} from '@/app/(home)/AppList/Editor/hooks';
import clsx from 'clsx';
import useResourceStore from '../../hooks/useResourceStore';
import useCreateArticle from '../../hooks/useCreateArticle';
import useCreateFolder from '@/app/(home)/AppList/Editor/hooks/useCreateFolder';

// 阻止事件冒泡
const stopPropagation = (e) => e.stopPropagation();

const Title = (props) => {
  const { data } = props;
  const { createFolders } = useCreateFolder();
  const { createArticle } = useCreateArticle();
  const handleCreateArticles = useHandleCreateArticles();
  const handleUpdateFolders = useHandleUpdateFolders();
  const handleUpdateArticles = useHandleUpdateArticles();
  const handleRemoveFolders = useHandleRemoveFolders();
  const handleRemoveArticles = useHandleRemoveArticles();
  const { openFolderIds, openFolder, createTmpFolder, createTmpArticle } = useResourceStore();

  const dispatch = useDispatch();

  // const { openFolderIds } = useSelector((state) => ({
  //   openFolderIds: state.editor.side.openFolderIds,
  // }));

  // 点击更多下拉菜单项
  const handleClickMenu = useCallback(({ item, domEvent }) => {
    console.log('%c [ item ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', item);
    stopPropagation(domEvent);
    item.props.data.onClick();
  }, []);

  // 下拉菜单点击事件: 点击创建文件夹
  const handleCreateFolderMenu = useCallback(() => {
    if (!data.folder) {
      openFolder(data.id); // 在文件夹上触发下拉框, 先打开文件夹
      createTmpFolder(data.id); // 创建临时文件夹
    } else {
      createTmpFolder(data.folder?.id); // 创建临时文件夹
    }
  }, [data, openFolder, createTmpFolder]);

  // 下拉菜单点击事件: 点击创建文章
  const handleCreateArticleMenu = useCallback(() => {
    if (!data.folder) {
      openFolder(data.id); // 在文件夹上触发下拉框, 先打开文件夹
      createTmpArticle(data.id); // 创建临时文章
    } else {
      createTmpArticle(data.folder?.id); // 在文章上触发下拉框
    }
  }, [createTmpArticle, data, openFolder]);

  // 下拉菜单点击事件: 点击编辑
  const handleEditMenu = useCallback(() => {
    const reducerName = !data.folder ? 'addEditorStatusWithFolder' : 'addEditorStatusWithArticle';
    dispatch(actions.editor[reducerName](data.id));
  }, [dispatch, data.id, data.folder]);

  // 下拉菜单点击事件: 移动
  const handleMoveMenu = useCallback(() => {
    dispatch(actions.modal.open({ code: MOVE, data: data }));
  }, [dispatch, data]);

  // 下拉菜单点击事件: 点击删除
  const handleDeleteMenu = useCallback(async () => {
    if (data.folder) {
      handleRemoveArticles({
        conds: { id: data.id },
      });
    } else {
      handleRemoveFolders({
        conds: { id: data.id },
      });
    }
  }, [data, handleRemoveArticles, handleRemoveFolders]);

  // 标题 - 更多 - 下列菜单
  const moreMenu = useMemo(() => {
    const setting = [
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
        conds: !data.children?.length > 0, // TODO： 文件夹未展开, 是无效的
      },
    ];

    const items = setting
      .filter((v) => v.conds)
      .map((data) => ({
        data,
        key: data.title,
        label: (
          <>
            <Icon type={data.icon} />
            {data.title}
          </>
        ),
      }));

    return {
      items,
      onClick: handleClickMenu,
      className: scss['operation-menu'],
    };
  }, [
    handleEditMenu,
    handleMoveMenu,
    handleClickMenu,
    handleDeleteMenu,
    handleCreateFolderMenu,
    handleCreateArticleMenu,
    data.children?.length,
  ]);

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const handleEdit = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
      const name = (e.target as HTMLInputElement).value;
      const isNew = data.id === 'new';
      const isFolder = !data.folder;

      switch (true) {
        case isFolder && isNew: // 新建 - 文件夹
          createFolders({ name, parentId: data.parent?.id });
          break;
        case !isFolder && isNew: // 新建 - 文章
          createArticle({ name, folderId: data.folder?.id });
          break;
        case isFolder && !isNew: // 编辑 - 文件夹
          handleUpdateFolders({
            body: { name },
            conds: { id: data.id },
          });
          break;
        case !isFolder && !isNew: // 编辑 - 文章
          handleUpdateArticles({
            body: { name },
            conds: { id: data.id },
          });
          break;
      }
    },
    [data, createFolders, createArticle, handleUpdateFolders, handleUpdateArticles],
  );

  // 输入框回车事件
  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        handleEdit(e);
      }
    },
    [handleEdit],
  );

  return (
    <div className={clsx(scss['menu-title'], { [scss['menu-title-article']]: data.folder })}>
      <Icon
        type="icon-jiantou"
        className={scss['menu-title-arrow']}
      />
      <Icon type={data.folder ? 'icon-24' : 'icon-wenjianjia'} />
      <div className={scss['menu-title-content']}>
        {data.editor ? (
          <Input
            autoFocus
            size="sm"
            radius="none"
            onBlur={handleEdit}
            onKeyUp={handleKeyUp}
            onClick={stopPropagation}
            defaultValue={data.name}
            classNames={{
              input: '!text-white/80',
              inputWrapper: '!bg-white/10',
            }}
          />
        ) : (
          data.name
        )}
      </div>
      {!data.editor ? (
        <div className={scss['menu-title-more']}>
          <Dropdown
            menu={moreMenu}
            trigger={['click']}
            placement="bottomRight"
            onClick={stopPropagation}>
            <Icon type="icon-gengduo" />
          </Dropdown>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Title);
