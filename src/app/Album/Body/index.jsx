import React from 'react';
import List from './List';
import Header from './Header';
import Upload from './Upload';
import scss from './index.module.scss';

export default () => (
  <div className={scss['body']}>
    <Upload />
    <Header />
    <List />
  </div>
);
