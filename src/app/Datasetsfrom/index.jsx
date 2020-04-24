import React from 'react';
import Menu from './Menu';
import Body from './Body';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <Menu/>
    <Body/>
  </div>
);
