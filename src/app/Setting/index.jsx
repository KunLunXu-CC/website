import React from 'react';
import Body from './Body';
import Header from './Header';
import scss from './index.module.scss';

export default () => (
  <div className={scss.setting}>
    <Header/>
    <Body/>
  </div>
);
