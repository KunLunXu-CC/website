import React, {
  useRef,
  useMemo,
  useState,
  Fragment,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Icon, Scroll } from 'qyrc';
import { Dropdown, Menu, Input } from 'antd';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const editorInputRef = useRef(null);

  // 阻止事件冒泡
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // 创建文件夹
  const createFolder = () => {
    if (props.data.type === 'tag'){
      store.menu.onOpenChange(props.data.id);
      store.tag.createFictitiousTag(props.data);
    } else {
      store.tag.createFictitiousTag(props.data.tags[0]);
    }
  };

  // 编辑文件夹
  const editorFolder = () => {
    store.tag.editorFolder(props.data);
  };

  // 删除文件夹
  const deleteFolder = () => {
    store.tag.removeTags({ id: props.data.id });
  };

  // 创建文章
  const createArticle = () => {
    if (props.data.type === 'tag'){
      store.menu.onOpenChange(props.data.id);
      store.article.createFictitiousArticle(props.data);
    } else {
      store.article.createFictitiousArticle(props.data.tags[0]);
    }
  };

  // 编辑文章
  const editorArticle = () => {
    store.article.editorArticle(props.data);
  };

  // 删除文章
  const deleteArticle = () => {
    store.article.removeArticle({ id: props.data.id });
  };

  // 点击操作菜单: 根据 key 分发到不同处理函数
  const onClickOperationMenu = ({ key, keyPath, item, domEvent }) => {
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
  const onEditor = (e) => {
    const name = e.target.value;
    if (props.data.type === 'tag'){
      props.data.id === 'newTag'
        ? store.tag.createTag({ name, parent: props.data.parent.id})
        : store.tag.updateTag({ name, id: props.data.id });
    } else {
        props.data.id === 'newArticle'
          ? store.article.createArticle({ name, tags: [props.data.tags[0].id] })
          : store.article.updateArticle({ name, id: props.data.id });
    }
  };

  // 记得箭头小图标
  const arrowClass = useMemo(() => {
    return classNames(
      scss['menu-title-arrow'], 
      {[scss['menu-title-arrow-article']]: props.data.type === 'article'}
    );
  },[props.data.type]);

  // 菜单图标
  const menuIcon = useMemo(() => {
    const map = {
      article: 'icon-24',
      tag: 'icon-wenjianjia',
    };
    return map[props.data.type];
  },[props.data.type]);

  useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  });

  return { 
    menuIcon,
    onEditor, 
    arrowClass, 
    editorInputRef, 
    stopPropagation, 
    onClickOperationMenu, 
  };
}

// props.type = 'subMenu | item ' props.data props.onMore
export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  const menu = (
    <Menu 
      className={scss['operation-menu']}
      onClick={state.onClickOperationMenu}>
      <Menu.Item key="createFolder">
        <Icon type="icon-wenjianjia"/>
        创建文件夹
      </Menu.Item>
      <Menu.Item key="createArticle">
        <Icon type="icon-24"/>
        创建文章      
      </Menu.Item>
      <Menu.Item key={props.type === 'subMenu' ? 'editorFolder': 'editorArticle'}>
        <Icon type="icon-baocun"/>
        编辑     
      </Menu.Item>
      <Menu.Item key={props.type === 'subMenu' ? 'deleteFolder': 'deleteArticle'}>
        <Icon type="icon-shanchu" />
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={scss['menu-title']}>
      <div className={scss['menu-title-content']}>
        <Icon type="icon-jiantou" className={state.arrowClass}/>
        <Icon type={state.menuIcon}/>
        {props.data.editor ? 
          <Input
            onBlur={state.onEditor}
            ref={state.editorInputRef}
            onPressEnter={state.onEditor}
            defaultValue={props.data.name}
            onClick={state.stopPropagation}
            className={scss['menu-title-input']} 
          /> : props.data.name}
      </div>
      {!props.data.editor ? 
        <div className={scss['menu-title-more']}>
          <Dropdown
            overlay={menu} 
            trigger={['click']}
            placement="bottomRight" 
            onClick={state.stopPropagation} >
            <Icon type="icon-gengduo" onClick={state.onMore}/>
          </Dropdown>
        </div>
      : null} 
    </div>
  );
};
