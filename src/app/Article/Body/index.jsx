import React from 'react';
import ListPage from './ListPage';
import ReadPage from './ReadPage';
import SearchBar from './SearchBar';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();

  return useObserver(() => (
    <div className={scss.body}>
      <SearchBar />
      {store.article.article
        ? <ReadPage />
        : <ListPage />
      }
    </div>
  ));
};
