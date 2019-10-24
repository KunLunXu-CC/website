import React, {
  useState,
  Fragment,
  useEffect, 
} from 'react';
import { Icon, Scroll } from 'qyrc';
import scss from './index.module.scss';

const useStateHook = (props) => {

  // 点击更多
  const onMore = (e) => {
    e.stopPropagation();
    props.onMore(props.type, props.data);
  }

  return { onMore };
}

// props.type = 'subMenu | item | empty' props.data props.onMore
export default (props) => {
  const state = useStateHook(props);
  switch(props.type){
    case 'subMenu':
      return (
        <div className={scss['menu-title']}>
          <div className={scss['menu-title-content']}>
            <Icon type="icon-jiantou" className={scss['menu-title-arrow']}/>
            <Icon type="icon-wenjianjia"/>
            {props.data.name}
          </div>
          <div className={scss['menu-title-more']}>
            <Icon type="icon-gengduo" onClick={state.onMore}/>
          </div>
        </div>
      );
    case 'item':
      return (
        <div className={scss['menu-title']}>
          <div className={scss['menu-title-content']}>
            {props.data.name}
          </div>
          <div className={scss['menu-title-more']}>
            <Icon type="icon-gengduo" onClick={state.onMore}/>
          </div>
        </div>
      );
    case 'empty':
      return (
        <div className={scss['menu-title']}>
          <div className={scss['menu-title-content']}>
            {/* <Icon type="icon-wenjianjia"/>          */}
          </div>
        </div>
      );
    default:
      return null;
  }
};
