import React from 'react';
import { Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import Item from './Item';
import { useStore } from '../../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Scroll className={scss.list}>
      {store.article.tops.map((value, index) => (
        <Item key={index} data={value}/>
      ))}
    </Scroll>
  ));
};
