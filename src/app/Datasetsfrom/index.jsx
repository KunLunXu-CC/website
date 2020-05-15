import React from 'react';
import Menu from './Menu';
import Body from './Body';
import Tips from './Tips';
import Editor from './Editor';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <Menu/>
    <Body/>
    <Editor/>
    <Tips/>
  </div>
);
