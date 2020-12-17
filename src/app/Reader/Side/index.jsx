import React from 'react';
import Menu from './Menu';
import Search from './Search';
import scss from './index.module.scss';

export default () => (
  <div className={scss.side}>
    <Search/>
    <Menu/>
  </div>
);
