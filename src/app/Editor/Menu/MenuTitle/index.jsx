import React, {
  useState,
  Fragment,
  useEffect, 
} from 'react';
import { Dropdown, Menu } from 'antd';
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

// props.type = 'subMenu | item ' props.data props.onMore
export default (props) => {
  const state = useStateHook(props);
  const menu = (
    <Menu className={scss['operation-menu']}>
      <Menu.Item key="0">
        <Icon type="icon-wenjianjia"/>
        新建文件夹
      </Menu.Item>
      <Menu.Item key="1">
        <Icon type="icon-24"/>
        新建文件        
      </Menu.Item>
      <Menu.Item key="3">
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
        {props.data.name}
      </div>
      <div className={scss['menu-title-more']}>
        <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
          <Icon type="icon-gengduo" onClick={state.onMore}/>
        </Dropdown>
      </div>
    </div>
  );
};
