import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@store';
import { Icon } from '@kunlunxu/brick';
import { MOVE } from '../../../consts';
import { Dropdown, Input } from 'antd';
import { ARTICLE_STATUS } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useMemo, useCallback, useEffect } from 'react';

// 阻止事件冒泡
const stopPropagation = (e) => e.stopPropagation();

export default (props) => {
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
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch({
        parent: props.data.id,
        type: 'editor/createTmpTag',
      });
    } else { // 在文章上触发下拉框
      dispatch({
        type: 'editor/createTmpTag',
        parent: props.data.tags?.[0].id,
      });
    }
  }, [dispatch, openKeys, props.data.id, props.data.tags]);

  // 下拉菜单点击事件: 点击创建文章
  const handleCreateArticleMenu = useCallback(() => {
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch(actions.editor.setSide({
        openKeys: [...openKeys, props.data.id],
      }));

      dispatch({
        tag: props.data.id,
        type: 'editor/createTmpArticle',
      });
    } else { // 在文章上触发下拉框
      dispatch({
        tag: props.data.tags?.[0].id,
        type: 'editor/createTmpArticle',
      });
    }
  }, [dispatch, openKeys, props.data.id, props.data.tags]);

  // 下拉菜单点击事件: 点击编辑
  const handleEditMenu = useCallback(() => {
    const type = !props.data.tags
      ? 'editor/addEditorStatusWithTag'
      : 'editor/addEditorStatusWithArticle';
    dispatch({ type, id: props.data.id });
  }, [dispatch, props.data.id, props.data.tags]);

  // 下拉菜单点击事件: 移动
  const handleMoveMenu = useCallback(() => dispatch({
    data: props.data,
    code: MOVE,
    type: 'modal/openModal',
  }), [dispatch, props.data]);

  // 下拉菜单点击事件: 点击删除
  const handleDeleteMenu = useCallback(() => {
    const type = !props.data.tags
      ? 'editor/removeTag'
      : 'editor/removeArticle';
    dispatch({ ...props.data, type, id: props.data.id });
  }, [dispatch, props.data]);

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
            9
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
    const isFolder = !props.data.tags;
    dispatch([
      {
        // 新建文件夹
        filter: isFolder && isNew,
        dispatchParams: {
          type: 'editor/createTag',
          body: { name, parent: props.data.parent?.id },
        },
      },
      {
        // 编辑文件夹
        filter: isFolder && !isNew,
        dispatchParams: {
          body: { name },
          id: props.data.id,
          type: 'editor/updateTag',
        },
      },
      {
        // 新建文件
        filter: !isFolder && isNew,
        dispatchParams: {
          type: 'editor/createArticle',
          body: {
            name,
            tags: [props.data.tags?.[0].id],
          },
        },
      },
      {
        // 编辑文章
        filter: !isFolder && !isNew,
        dispatchParams: {
          body: { name },
          id: props.data.id,
          type: 'editor/updateArticle',
        },
      },
    ].find((v) => v.filter).dispatchParams);
  }, [dispatch, props.data]);

  // 最外层 className
  const className = useMemo(() => (classNames(scss['menu-title'], {
    [scss['menu-title-article']]: props.data.tags,
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
      <Icon type={props.data.tags ? 'icon-24' : 'icon-wenjianjia'} />
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
