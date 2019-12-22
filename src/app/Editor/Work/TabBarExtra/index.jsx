import React from 'react';
import { Icon } from 'qyrc';
import scss from './index.module.scss';

export default () => (
  <div className={scss.extra}>
    <Icon
      type="icon-yulan"
      className={scss['icon-preview']}/>
    <Icon
      type="icon-genghuanfengmian"
      className={scss['icon-thumbnail']}/>
    <Icon
      type="icon-fabu"
      className={scss['icon-release']}/>
    {/* 下架图标 */}
    {/* <Icon
      type="icon-xiajia"
      className={scss['icon-lower-shelf']}/> */}
  </div>
);
