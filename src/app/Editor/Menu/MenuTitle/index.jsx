import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { Icon } from 'qyrc';
import classNames from 'classnames';
import { Dropdown, Menu, Input } from 'antd';

import { useStore } from '../../store';
import scss from './index.module.scss';

// 阻止事件冒泡
const stopPropagation = e => {
  e.stopPropagation();
};

// 创建文件夹
const createFolder = (props, store) => {
  if (props.data.type === 'tag') {
    store.menu.onOpenChange(props.data.id);
    store.tag.createFictitiousTag(props.data);
  } else {
    store.tag.createFictitiousTag(props.data.tags[0]);
  }
};

// 编辑文件夹
const editorFolder = (props, store) => {
  store.tag.editorFolder(props.data);
};

// 删除文件夹
const deleteFolder = (props, store) => {
  store.tag.removeTags({ id: props.data.id });
};

// 创建文章
const createArticle = (props, store) => {
  if (props.data.type === 'tag') {
    store.menu.onOpenChange(props.data.id);
    store.article.createFictitiousArticle(props.data);
  } else {
    store.article.createFictitiousArticle(props.data.tags[0]);
  }
};

// 编辑文章
const editorArticle = (props, store) => {
  store.article.editorArticle(props.data);
};

// 删除文章
const deleteArticle = (props, store) => {
  store.article.removeArticle({ id: props.data.id });
};

const useStateHook = (props, store) => {
  const editorInputRef = useRef(null);

  // 点击操作菜单: 根据 key 分发到不同处理函数
  const onClickOperationMenu = useCallback(({ key, domEvent }) => {
    stopPropagation(domEvent);
    const handler = {
      createFolder,
      editorFolder,
      deleteFolder,
      createArticle,
      editorArticle,
      deleteArticle,
    };
    handler[key](props, store);
  }, [props, store]);

  // 编辑数据： 根据 id 判断是编辑还是创建，根据 type 值来判断操作对象
  const onEditor = e => {
    const name = e.target.value;
    if (props.data.type === 'tag') {
      props.data.id === 'newTag'
        ? store.tag.createTag({ name, parent: props.data.parent.id })
        : store.tag.updateTag({ name, id: props.data.id });
    } else {
      props.data.id === 'newArticle'
        ? store.article.createArticle({ name, tags: [props.data.tags[0].id] })
        : store.article.updateArticle({ body: { name }, id: props.data.id });
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
  const store = useStore();
  const state = useStateHook(props, store);

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
