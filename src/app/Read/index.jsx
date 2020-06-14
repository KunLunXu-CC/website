import React from 'react';
import Menu from './Menu';
import Content from './Content';
import Editor from './Editor';
import Header from './Header';
import scss from './index.module.scss';

export default () => (
  <div className={scss.read}>
    <Header />
    <div className={scss.body}>
      <Menu />
      <div className={scss.main}>
        <Content />
        <Editor />
      </div>
    </div>
  </div>
);
