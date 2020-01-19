import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';


import { Icon } from 'qyrc';
import { useDispatch } from 'react-redux';
import { Dropdown, Menu, Input } from 'antd';

// 阻止事件冒泡
const stopPropagation = e => {
  e.stopPropagation();
};

const useStateHook = props => {
  const editorInputRef = useRef(null);

  const dispatch = useDispatch();

  // 创建文件夹
  const createFolder = () => {
    if (props.data.type === 'tag') {
      dispatch({ type: 'editor/setMenu', menu: { openKeys: [props.data.id] } });
      dispatch({ type: 'editor/createFictitiousTag', parent: props.data });
    } else {
      dispatch({
        parent: props.data.tags[0],
        type: 'editor/createFictitiousTag',
      });
    }
  };

  // 编辑文件夹
  const editorFolder = () => {
    dispatch({
      id: props.data.id,
      type: 'editor/editorFolder',
    });
  };

  // 删除文件夹
  const deleteFolder = () => {
    dispatch({
      id: props.data.id,
      type: 'editor/removeTags',
    });
  };

  // 创建文章
  const createArticle = () => {
    if (props.data.type === 'tag') {
      dispatch({ type: 'editor/setMenu', menu: { openKeys: [props.data.id] } });
      dispatch({ type: 'editor/createFictitiousArticle', parent: props.data });
    } else {
      dispatch({
        parent: props.data.tags[0],
        type: 'editor/createFictitiousArticle',
      });
    }
  };

  // 编辑文章
  const editorArticle = () => {
    dispatch({
      id: props.data.id,
      type: 'editor/editorArticle',
    });
  };

  // 删除文章
  const deleteArticle = () => {
    dispatch({ type: 'editor/removeArticle', id: props.data.id });
  };

  // 点击操作菜单: 根据 key 分发到不同处理函数
  const onClickOperationMenu = ({ key, domEvent }) => {
    stopPropagation(domEvent);
    const handler = {
      createFolder,
      editorFolder,
      deleteFolder,
      createArticle,
      editorArticle,
      deleteArticle,
    };
    handler[key]();
  };

  // 编辑数据： 根据 id 判断是编辑还是创建，根据 type 值来判断操作对象
  const onEditor = e => {
    const name = e.target.value;
    if (props.data.type === 'tag') {
      props.data.id === 'newTag'
        ? dispatch({
          type: 'editor/createTag',
          body: { name, parent: props.data.parent.id },
        })
        : dispatch({
          body: { name },
          id: props.data.id,
          type: 'editor/updateTag',
        });
    } else {
      props.data.id === 'newArticle'
        ? dispatch({
          type: 'editor/createArticle',
          body: { name, tags: [props.data.tags[0].id] },
        })
        : dispatch({
          body: { name },
          id: props.data.id,
          type: 'editor/updateArticle',
        });
    }
  };

  // 记得箭头小图标
  const arrowClass = useMemo(() => classNames(
    scss['menu-title-arrow'],
    { [scss['menu-title-arrow-article']]: props.data.type === 'article' }
  ), [props.data.type]);

  // 菜单图标
  const menuIcon = useMemo(() => {
    const map = {
      article: 'icon-24',
      tag: 'icon-wenjianjia',
    };
    return map[props.data.type];
  }, [props.data.type]);

  // 下拉菜单
  const menu = useMemo(() => {
    const editKey = props.type === 'subMenu'
      ? 'editorFolder'
      : 'editorArticle';
    const deleeKey = props.type === 'subMenu'
      ? 'deleteFolder'
      : 'deleteArticle';
    const menuSetting = [
      { title: '创建文件夹', key: 'createFolder', icon: 'icon-wenjianjia' },
      { title: '创建文章', key: 'createArticle', icon: 'icon-24' },
      { title: '编辑', key: editKey, icon: 'icon-baocun' },
      { title: '删除', key: deleeKey, icon: 'icon-shanchu' },
    ];
    return (
      <Menu
        className={scss['operation-menu']}
        onClick={onClickOperationMenu}>
        {menuSetting.map(v => (
          <Menu.Item key={v.key}>
            <Icon type={v.icon}/>
            {v.title}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [props.type, onClickOperationMenu]);

  useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return {
    menu,
    menuIcon,
    onEditor,
    arrowClass,
    editorInputRef,
    stopPropagation,
  };
};

// props.type = 'subMenu | item ' props.data props.onMore
export default props => {
  const state = useStateHook(props);

  return (
    <div className={scss['menu-title']}>
      <Icon type="icon-jiantou" className={state.arrowClass}/>
      <Icon type={state.menuIcon}/>
      <div className={scss['menu-title-content']}>
        {props.data.editor ?
          <Input
            onBlur={state.onEditor}
            ref={state.editorInputRef}
            onPressEnter={state.onEditor}
            defaultValue={props.data.name}
            onClick={state.stopPropagation}
            className={scss['menu-title-content-input']}
          /> : props.data.name}
      </div>
      {!props.data.editor ?
        <div className={scss['menu-title-more']}>
          <Dropdown
            trigger={['click']}
            overlay={state.menu}
            placement="bottomRight"
            onClick={state.stopPropagation} >
            <Icon type="icon-gengduo" onClick={state.onMore}/>
          </Dropdown>
        </div> : null
      }
    </div>
  );
};
