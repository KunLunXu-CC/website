import React from 'react';
import ListPage from './ListPage';
import SearchBar from './SearchBar';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <SearchBar />
    <ListPage />
  </div>
);
