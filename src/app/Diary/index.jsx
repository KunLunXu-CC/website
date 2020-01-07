import React from 'react';
import List from './List';
import Work from './Work';
import Header from './Header';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <Header />
    <div className={scss['layout-body']}>
      <List/>
      <Work/>
    </div>
  </div>
);
