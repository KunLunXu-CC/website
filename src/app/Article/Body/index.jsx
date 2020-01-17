import React from 'react';
import ListPage from './ListPage';
import ReadPage from './ReadPage';
import SearchBar from './SearchBar';
import scss from './index.module.scss';

import { useSelector } from 'react-redux';

export default () => {
  const article = useSelector(state => _.get(state, 'article.article'));
  return (
    <div className={scss.body}>
      <SearchBar />
      {article ? <ReadPage /> : <ListPage />}
    </div>
  );
};
