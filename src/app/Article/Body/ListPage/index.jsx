import React from 'react';
import { Scroll } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import Item from './Item';
import { useStore } from '../../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Scroll className={scss.scroll}>
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
