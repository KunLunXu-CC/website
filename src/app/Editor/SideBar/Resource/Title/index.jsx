import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu, Input } from 'antd';

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
    if (props.data.type === 'tag') { // 在文件夹上触发下拉框
      dispatch({
        type: 'editor/setSide',
        side: { openKeys: [... openKeys, props.data.id] },
      });
      dispatch({
        parent: props.data.id,
        type: 'editor/createTemTag',
      });
    } else { // 在文章上触发下拉框
      dispatch({
        parent: props.data.tag,
        type: 'editor/createTemTag',
      });
    }
  };

  // 下拉菜单点击事件: 点击创建文章
  const onClickCreateArticleMenu = () => {
    if (props.data.type === 'tag') { // 在文件夹上触发下拉框
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
        tag: props.data.parent,
        type: 'editor/createTmpArticle',
      });
    }
  };

  // 下拉菜单点击事件: 点击编辑
  const onClickEditMenu = () => {
    const type = props.data.type === 'tag'
      ? 'editor/addEditorStatusWithTag'
      : 'editor/addEditorStatusWithArticle';
    dispatch({
      type,
      id: props.data.id,
    });
  };

  // 下拉菜单点击事件: 点击删除
  const onClickDeleteMenu = () => {
    const type = props.data.type === 'tag'
      ? 'editor/removeTag'
      : 'editor/removeArticle';
    dispatch({
      type,
      id: props.data.id,
    });
  };

  // 下拉菜单配置
  const dropdownMenuSetting = React.useMemo(() => ([
    {
      title: '创建文件夹',
      icon: 'icon-wenjianjia',
      onClick: onClickCreateFolderMenu,
    },
    {
      title: '创建文章',
      icon: 'icon-24',
      onClick: onClickCreateArticleMenu,
    },
    {
      title: '编辑',
      icon: 'icon-baocun',
      onClick: onClickEditMenu,
    },
    {
      title: '删除',
      icon: 'icon-shanchu',
      onClick: onClickDeleteMenu,
    },
  ]), [
    onClickEditMenu,
    onClickDeleteMenu,
    onClickCreateFolderMenu,
    onClickCreateArticleMenu,
  ]);

  // 编辑标签
  const onEditTag = name => {
    props.data.id === 'new'
      ? dispatch({
        type: 'editor/createTag',
        body: { name, parent: props.data.parent },
      })
      : dispatch({
        body: { name },
        id: props.data.id,
        type: 'editor/updateTag',
      });
  };

  // 编辑文章
  const onEditArticle = name => {
    props.data.id === 'new'
      ? dispatch({
        type: 'editor/createArticle',
        body: { name, tags: [props.data.tag] },
      })
      : dispatch({
        body: { name },
        id: props.data.id,
        type: 'editor/updateArticle',
      });
  };

  // 编辑数据：根据 id 判断是编辑还是创建, 根据 type 值来判断是更新标签还是文章
  const onEdit = e => {
    const name = e.target.value;
    props.data.type === 'tag'
      ? onEditTag(name)
      : onEditArticle(name);
  };

  // 标题前箭头 - className
  const classNameWithArrow = React.useMemo(() => classNames(
    scss['menu-title-arrow'],
    { [scss['menu-title-arrow-article']]: props.data.type === 'article' }
  ), [props.data.type]);

  // 标题前图标
  const menuIcon = React.useMemo(() => ({
    article: 'icon-24',
    tag: 'icon-wenjianjia',
  }[props.data.type]), [props.data.type]);

  React.useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return {
    onEdit,
    menuIcon,
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
              <Menu className={scss['operation-menu']}>
                {state.dropdownMenuSetting.map(v => (
                  <Menu.Item key={v.key} onClick={v.onClick}>
                    <Icon type={v.icon}/>
                    {v.title}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomRight"
            onClick={state.stopPropagation} >
            <Icon type="icon-gengduo" onClick={state.onMore}/>
          </Dropdown>
        </div> : null
      }
    </div>
  );
};
