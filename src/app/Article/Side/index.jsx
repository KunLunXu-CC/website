import React from 'react';
import Title from './Title';
import ListPage from './ListPage';
import scss from './index.module.scss';

export default () => (
  <div className={scss.side}>
    <Title />
    <ListPage />
  </div>
);
