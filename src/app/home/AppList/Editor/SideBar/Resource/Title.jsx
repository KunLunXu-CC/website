import classNames from 'classnames';
import scss from './title.module.scss';

import { actions } from '@/store';
import { MOVE } from '../../constants';
import { Icon } from '@kunlunxu/brick';
import { Dropdown, Input } from 'antd';
import { ARTICLE_STATUS } from '@/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import {
  useHandleUpdateFolders,
  useHandleUpdateArticles,
  useHandleCreateFolders,
  useHandleCreateArticles,
  useHandleRemoveFolders,
  useHandleRemoveArticles,
} from '@/app/home/AppList/Editor/hooks';

// 阻止事件冒泡
const stopPropagation = (e) => e.stopPropagation();

const Title =  (props) => {
  const handleCreateFolders = useHandleCreateFolders();
  const handleCreateArticles = useHandleCreateArticles();
  const handleUpdateFolders = useHandleUpdateFolders();
  const handleUpdateArticles = useHandleUpdateArticles();
  const handleRemoveFolders = useHandleRemoveFolders();
  const handleRemoveArticles = useHandleRemoveArticles();

  const dispatch = useDispatch();
  const editorInputRef = useRef(null);

  const { openKeys, activity } = useSelector((state) => ({
    openKeys: state.editor.side.openKeys,
    activity: state.editor.activity,
  }));

  // 点击下拉菜单
  const handleClickMenu = useCallback(({ item, domEvent }) => {
    stopPropagation(domEvent);
    item.props.data.onClick();
  }, []);

  // 下拉菜单点击事件: 点击创建文件夹
  const handleCreateFolderMenu = useCallback(() => {
    if (!props.data.folder) {
      // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch(actions.editor.createTmpFolder(props.data.id));
    } else {
      // 在文章上触发下拉框
      dispatch(actions.editor.createTmpFolder(props.data.folder?.id));
    }
  }, [dispatch, openKeys, props.data.id, props.data.folder]);

  // 下拉菜单点击事件: 点击创建文章
  const handleCreateArticleMenu = useCallback(() => {
    if (!props.data.folder) {
      // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch(actions.editor.createTmpArticle(props.data.id));
    } else {
      // 在文章上触发下拉框
      dispatch(actions.editor.createTmpArticle(props.data.folder?.id));
    }
  }, [props.data, dispatch, openKeys]);

  // 下拉菜单点击事件: 点击编辑
  const handleEditMenu = useCallback(() => {
    const reducerName = !props.data.folder ? 'addEditorStatusWithFolder' : 'addEditorStatusWithArticle';
    dispatch(actions.editor[reducerName](props.data.id));
  }, [dispatch, props.data.id, props.data.folder]);

  // 下拉菜单点击事件: 移动
  const handleMoveMenu = useCallback(() => {
    dispatch(actions.modal.open({ code: MOVE, data: props.data }));
  }, [dispatch, props.data]);

  // 下拉菜单点击事件: 点击删除
  const handleDeleteMenu = useCallback(async () => {
    if (props.data.folder) {
      handleRemoveArticles({
        conds: { id: props.data.id },
      });
    } else {
      handleRemoveFolders({
        conds: { id: props.data.id },
      });
    }
  }, [props.data, handleRemoveArticles, handleRemoveFolders]);

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
        conds: !props.data.children?.length > 0, // TODO： 文件夹未展开, 是无效的
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
    props.data.children?.length,
  ]);

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const handleEdit = useCallback((e) => {
    const name = e.target.value;
    const isNew = props.data.id === 'new';
    const isFolder = !props.data.folder;

    const map = [
      // 1. 新建 - 文件夹
      {
        cond: isFolder && isNew,
        handler: handleCreateFolders.bind(null, {
          body: [{
            name,
            parent: props.data.parent?.id,
          }],
        }),
      },
      // 2. 新建 - 文章
      {
        cond: !isFolder && isNew,
        handler: handleCreateArticles.bind(null, {
          body: [{
            name,
            folder: props.data.folder?.id,
          }],
        }),
      },
      // 3. 编辑 - 文件夹
      {
        cond: isFolder && !isNew,
        handler: handleUpdateFolders.bind(null, {
          body: { name },
          conds: { id: props.data.id },
        }),
      },
      // 4. 编辑 - 文章
      {
        cond: !isFolder && !isNew,
        handler: handleUpdateArticles.bind(null, {
          body: { name },
          conds: { id: props.data.id },
        }),
      },
    ];

    map.find((v) => v.cond).handler();
  }, [
    props.data,
    handleCreateFolders,
    handleUpdateFolders,
    handleCreateArticles,
    handleUpdateArticles,
  ]);

  // 最外层 className
  const className = useMemo(() => (classNames(scss['menu-title'], {
    [scss['menu-title-article']]: props.data.folder,
    [scss['menu-title-release']]:
      !_.isNumber(activity.selectKey) &&
      props.data.status === ARTICLE_STATUS.RELEASE,
  })), [props.data, activity.selectKey]);

  useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return (
    <div className={className}>
      <Icon
        type="icon-jiantou"
        className={scss['menu-title-arrow']}
      />
      <Icon type={props.data.folder ? 'icon-24' : 'icon-wenjianjia'} />
      <div className={scss['menu-title-content']}>
        {props.data.editor ? (
          <Input
            onBlur={handleEdit}
            ref={editorInputRef}
            onPressEnter={handleEdit}
            onClick={stopPropagation}
            defaultValue={props.data.name}
            className={scss['menu-title-content-input']}
          />
        ) : props.data.name
        }
      </div>
      {!props.data.editor ? (
        <div className={scss['menu-title-more']}>
          <Dropdown
            menu={moreMenu}
            trigger={['click']}
            placement="bottomRight"
            onClick={stopPropagation}>
            <Icon type="icon-gengduo" />
          </Dropdown>
        </div>
      ) : null
      }
    </div>
  );
};

export default Title;
