import React, {
  useRef,
  useState,
  Fragment,
  useEffect,
} from 'react';
import { Dropdown, Menu, Input } from 'antd';
import { Icon, Scroll } from 'qyrc';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const editorInputRef = useRef(null);

  // 阻止事件冒泡
  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  // 点击操作菜单: 根据 key 处理不同操作
  const onClickOperationMenu = ({ key, keyPath, item, domEvent }) => {
    stopPropagation(domEvent);
    const handler = {
      createFolder: () => {
        store.tag.addFictitiousTag(props.data);
      },
      createArticle: () => {},
      editorFolder: () => {},
      editorArticle: () => {},
      deleteFolder: () => {},
      deleteArticle: () => {},
    };
    handler[key]();    
  }

  // 编辑数据： 根据 id 值判断是编辑还是创建
  const onEditor = (e) => {
    console.log('========>>>', e.target.value);
  }

  useEffect(() => {
    editorInputRef.current && editorInputRef.current.focus();
  }, []);

  return { onClickOperationMenu, stopPropagation, onEditor, editorInputRef };
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
        {props.type === 'subMenu' ? 
          <Fragment>
            <Icon type="icon-jiantou" className={scss['menu-title-arrow']}/>
            <Icon type="icon-wenjianjia"/>
          </Fragment>
        : null}
        {props.data.editor ? 
          <Input
            onBlur={state.onEditor}
            ref={state.editorInputRef}
            onPressEnter={state.onEditor}
            defaultValue={props.data.name}
            onClick={state.stopPropagation}
            className={scss['menu-title-input']} 
          />
        : props.data.name}
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
