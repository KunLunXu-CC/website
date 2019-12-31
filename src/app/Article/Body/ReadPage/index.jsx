import React from 'react';
import scss from './index.module.scss';

import { useStore } from '../../store';
import { Markdown, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

export default () => {
  const store = useStore();

  return useObserver(() => (
    <Scroll
      className={scss.scroll}
      onScroll={store.article.setScrollHeight}
      scrollHeight={store.article.scrollHeight}>
      <Markdown onTocParsed={store.article.setTocList}>
        {_.get(store, 'article.article.content') || ''}
      </Markdown>
    </Scroll>
  ));
};
