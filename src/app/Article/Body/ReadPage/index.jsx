import React from 'react';
import { Markdown } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();

  return useObserver(() => (
    <div className={scss.read}>
      <Markdown>
        {_.get(store, 'article.article.content')}
      </Markdown>
    </div>
  ));
};
