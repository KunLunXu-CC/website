import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Dropdown, Menu, Input } from 'antd';
import { MOVE_ARTICLE } from '../../../consts';
import { DATASETSFROM_CODE } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

// 阻止事件冒泡
const stopPropagation = e => e.stopPropagation();

const useStateHook = props => {
  const dispatch = useDispatch();
  const editorInputRef = React.useRef(null);
  const { openKeys } = useSelector(state => ({
    openKeys: state.editor.side.openKeys,
  }));

  // 下拉菜单点击事件: 点击创建文件夹
  const onClickCreateFolderMenu = () => {
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch({
        type: 'editor/setSide',
        side: { openKeys: [... openKeys, props.data.id] },
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
  };

  // 下拉菜单点击事件: 点击创建文章
  const onClickCreateArticleMenu = () => {
    if (!props.data.tags) { // 在文件夹上触发下拉框
      dispatch({
        type: 'editor/setSide',
        side: { openKeys: [... openKeys, props.data.id] },
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
  };

  // 下拉菜单点击事件: 点击编辑
  const onClickEditMenu = () => {
    const type = !props.data.tags
      ? 'editor/addEditorStatusWithTag'
      : 'editor/addEditorStatusWithArticle';
    dispatch({ type, id: props.data.id });
  };

  // 下拉菜单点击事件: 移动
  const onClickMoveMenu = () => dispatch({
    data: props.data,
    code: MOVE_ARTICLE,
    type: 'modal/openModal',
  });

  // 下拉菜单点击事件: 点击删除
  const onClickDeleteMenu = () => {
    const type = !props.data.tags
      ? 'editor/removeTag'
      : 'editor/removeArticle';
    dispatch({ type, id: props.data.id });
  };

  // 下拉菜单配置
  const dropdownMenuSetting = React.useMemo(() => ([
    {
      conds: true,
      title: '创建文件夹',
      icon: 'icon-wenjianjia',
      onClick: onClickCreateFolderMenu,
    },
    {
      // 第一级不能创建文章, 第二层文章上不能创建
      title: '创建文章',
      icon: 'icon-24',
      onClick: onClickCreateArticleMenu,
      conds: !(props.level === 1 || (props.data.tags && props.level === 2)),
    },
    {
      conds: true,
      title: '编辑',
      icon: 'icon-baocun',
      onClick: onClickEditMenu,
    },
    {
      title: '移动',
      icon: 'icon-baocun',
      conds: props.data.tags,
      onClick: onClickMoveMenu,
    },
    {
      // 顶级不允许删除、文件夹下有东西也不让删
      title: '删除',
      icon: 'icon-shanchu',
      onClick: onClickDeleteMenu,
      conds: props.level !== 1 && !props.data.children?.length > 0,
    },
  ].filter(v => v.conds)), [
    onClickEditMenu,
    onClickDeleteMenu,
    onClickCreateFolderMenu,
    onClickCreateArticleMenu,
  ]);

  // 编辑数据: 根据不同 id、type 设置不同 dispatch 参数
  const onEdit = e => {
    const name = e.target.value;
    const isNew = props.data.id === 'new';
    const isFolder = !props.data.tags;
    dispatch([
      {
        filter: isFolder && isNew,
        dispatchParams: {
          type: 'editor/createTag',
          body: { name, parent: props.data.parent?.id },
        },
      },
      {
        filter: isFolder && !isNew,
        dispatchParams: {
          body: { name },
          id: props.data.id,
          type: 'editor/updateTag',
        },
      },
      {
        filter: !isFolder && isNew,
        dispatchParams: {
          type: 'editor/createArticle',
          body: {
            name,
            type: props.root?.value,
            tags: [props.data.tags?.[0].id],
          },
        },
      },
      {
        filter: !isFolder && !isNew,
        dispatchParams: {
          body: { name },
          id: props.data.id,
          type: 'editor/updateArticle',
        },
      },
    ].find(v => v.filter).dispatchParams);
  };

  // 点击下拉菜单
  const onClickMenu = React.useCallback(({ item, domEvent }) => {
    stopPropagation(domEvent);
    item.props.data.onClick();
  }, []);

  // 标题前箭头 - className
  const classNameWithArrow = React.useMemo(() => classNames(
    scss['menu-title-arrow'],
    { [scss['menu-title-arrow-article']]: props.data.tags }
  ), [props.data.tags]);

  // 标题前图标
  const menuIcon = React.useMemo(() => [
    { // 文章
      icon: 'icon-24',
      conds: props.data.tags,
    },
    { // 文件夹
      icon: 'icon-wenjianjia',
      conds: props.data.code === DATASETSFROM_CODE.ARTICLE_TAG.VALUE,
    },
    { // 顶级文件夹(文件类型)
      icon: 'icon-xuanzhong',
      conds: props.data.code === DATASETSFROM_CODE.ARTICLE_TYPE.VALUE,
    },
  ].find(v => v.conds)?.icon, [props.data.tags, props.data.code]);

  React.useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return {
    onEdit,
    menuIcon,
    onClickMenu,
    editorInputRef,
    stopPropagation,
    classNameWithArrow,
    dropdownMenuSetting,
  };
};

export default props => {
  const state = useStateHook(props);
  return (
    <div className={scss['menu-title']}>
      <Icon type="icon-jiantou" className={state.classNameWithArrow}/>
      <Icon type={state.menuIcon}/>
      <div className={scss['menu-title-content']}>
        {props.data.editor ?
          <Input
            onBlur={state.onEdit}
            ref={state.editorInputRef}
            onPressEnter={state.onEdit}
            defaultValue={props.data.name}
            onClick={state.stopPropagation}
            className={scss['menu-title-content-input']}
          /> : props.data.name
        }
      </div>
      {!props.data.editor ?
        <div className={scss['menu-title-more']}>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu
                onClick={state.onClickMenu}
                className={scss['operation-menu']}>
                {state.dropdownMenuSetting.map(v => (
                  <Menu.Item key={v.title} data={v}>
                    <Icon type={v.icon}/>
                    {v.title}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomRight"
            onClick={state.stopPropagation}>
            <Icon type="icon-gengduo"/>
          </Dropdown>
        </div> : null
      }
    </div>
  );
};
