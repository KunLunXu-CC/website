import React from 'react';
import { Scroll } from 'qyrc';
import ListPage from './ListPage';
import SearchBar from './SearchBar';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['body']}>
      <div className={scss['body-search-bar']}>
        <SearchBar />
      </div>
      <Scroll className={scss['body-page']}>
        <ListPage />
      </Scroll>
    </div>
  );
}
