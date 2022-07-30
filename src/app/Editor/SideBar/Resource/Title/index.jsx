import classNames from 'classnames';
import scss from './index.module.scss';

import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Icon } from '@kunlunxu/brick';
import { Dropdown, Menu, Input } from 'antd';
import { MOVE } from '../../../consts';
import { ARTICLE_STATUS } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

// 阻止事件冒泡
const stopPropagation = (e) => e.stopPropagation();

const useStateHook = (props) => {
  const dispatch = useDispatch();
  const editorInputRef = useRef(null);
  const { openKeys, activity } = useSelector((state) => ({
    openKeys: state.editor.side.openKeys,
    activity: state.editor.activity,
  }));

  // 下拉菜单点击事件: 点击创建文件夹
  const onClickCreateFolderMenu = useCallback(() => {
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch({
        type: 'editor/setSide',
        side: { openKeys: [...openKeys, props.data.id] },
      });
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
  const onClickCreateArticleMenu = useCallback(() => {
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch({
        type: 'editor/setSide',
        side: { openKeys: [...openKeys, props.data.id] },
      });
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
  const onClickEditMenu = useCallback(() => {
    const type = !props.data.tags
      ? 'editor/addEditorStatusWithTag'
      : 'editor/addEditorStatusWithArticle';
    dispatch({ type, id: props.data.id });
  }, [dispatch, props.data.id, props.data.tags]);

  // 下拉菜单点击事件: 移动
  const onClickMoveMenu = useCallback(() => dispatch({
    data: props.data,
    code: MOVE,
    type: 'modal/openModal',
  }), [dispatch, props.data]);

  // 下拉菜单点击事件: 点击删除
  const onClickDeleteMenu = useCallback(() => {
    const type = !props.data.tags
      ? 'editor/removeTag'
      : 'editor/removeArticle';
    dispatch({ ...props.data, type, id: props.data.id });
  }, [dispatch, props.data]);

  // 下拉菜单配置
  const dropdownMenuSetting = useMemo(() => ([
    {
      conds: true,
      title: '创建文件夹',
      icon: 'icon-wenjianjia',
      onClick: onClickCreateFolderMenu,
    },
    {
      conds: true,
      title: '创建文章',
      icon: 'icon-24',
      onClick: onClickCreateArticleMenu,
    },
    {
      conds: true,
      title: '编辑',
      icon: 'icon-baocun',
      onClick: onClickEditMenu,
    },
    {
      conds: true,
      title: '移动',
      icon: 'icon-baocun',
      onClick: onClickMoveMenu,
    },
    {
      // TODO: 文件夹下有东西也不让删
      title: '删除',
      icon: 'icon-shanchu',
      onClick: onClickDeleteMenu,
      conds: !props.data.children?.length > 0, // TODO： 文件夹未展开, 是无效的
    },
  ].filter((v) => v.conds)), [
    onClickEditMenu,
    onClickMoveMenu,
    onClickDeleteMenu,
    onClickCreateFolderMenu,
    onClickCreateArticleMenu,
    props.data.children?.length,
  ]);

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const onEdit = (e) => {
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
  };

  // 点击下拉菜单
  const onClickMenu = useCallback(({ item, domEvent }) => {
    stopPropagation(domEvent);
    item.props.data.onClick();
  }, []);

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

  return {
    onEdit,
    className,
    onClickMenu,
    editorInputRef,
    stopPropagation,
    dropdownMenuSetting,
  };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className={state.className}>
      <Icon
        type="icon-jiantou"
        className={scss['menu-title-arrow']}
      />
      <Icon type={props.data.tags ? 'icon-24' : 'icon-wenjianjia'} />
      <div className={scss['menu-title-content']}>
        {props.data.editor ? (
          <Input
            onBlur={state.onEdit}
            ref={state.editorInputRef}
            onPressEnter={state.onEdit}
            defaultValue={props.data.name}
            onClick={state.stopPropagation}
            className={scss['menu-title-content-input']}
          />
        ) : props.data.name
        }
      </div>
      {!props.data.editor ? (
        <div className={scss['menu-title-more']}>
          <Dropdown
            trigger={['click']}
            overlay={(
              <Menu
                onClick={state.onClickMenu}
                className={scss['operation-menu']}>
                {state.dropdownMenuSetting.map((v) => (
                  <Menu.Item
                    key={v.title}
                    data={v}>
                    <Icon type={v.icon} />
                    {v.title}
                  </Menu.Item>
                ))}
              </Menu>
            )}
            placement="bottomRight"
            onClick={state.stopPropagation}>
            <Icon type="icon-gengduo" />
          </Dropdown>
        </div>
      ) : null
      }
    </div>
  );
};
