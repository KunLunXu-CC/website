import React from 'react';
import { Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import Item from './Item';

import scss from './index.module.scss';
import { useStore } from '../../store';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Scroll className={scss.list}>
      {store.article.list.map((value, index) => (
        <Item
          data={value}
          key={value.id}
          align={index % 2 !== 0 ? 'right' : 'left'}
        />
      ))}
      <br/>
    </Scroll>
  ));
};
