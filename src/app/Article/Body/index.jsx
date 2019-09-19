import React from 'react';
import { Scroll } from 'qyrc';
import ListPage from './ListPage';
import SearchBar from './SearchBar';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['body']}>
      <SearchBar />
      <Scroll className={scss['body-page']}>
        <ListPage />
      </Scroll>
    </div>
  );
}
