import _ from 'lodash';
import React from 'react';
import { Markdown, Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Scroll className={scss['list-box']}>
      <Markdown style={{ width: '100%' }} theme="dark">
        {_.get(store, 'note.content', '')}
      </Markdown>
    </Scroll>
  ));
};
