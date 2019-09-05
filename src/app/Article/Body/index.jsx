import React from 'react';
import { Scroll } from 'qyrc';
import SearchBar from './SearchBar';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['body']}>
      <div className={scss['body-search-bar']}>
        <SearchBar />
      </div>
      <Scroll className={scss['body-page']}>
        {/* 222 */}
      </Scroll>
    </div>
  );
}
