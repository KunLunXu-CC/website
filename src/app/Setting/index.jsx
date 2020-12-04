import React from 'react';
import Menu from './Menu';
import Header from './Header';
import scss from './index.module.scss';

export default () => (
  <div className={scss.setting}>
    <Header/>
    <div className={scss.main}>
      <Menu/>
      <div className={scss.body}>

      </div>
    </div>
  </div>
);
