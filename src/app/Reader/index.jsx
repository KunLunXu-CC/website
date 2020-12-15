import React from 'react';
import Menu from './Menu';
import Header from './Header';
import Article from './Article';
import scss from './index.module.scss';

export default () => (
  <div className={scss.reader}>
    <Header/>
    <Menu/>
    <Article/>
  </div>
);
