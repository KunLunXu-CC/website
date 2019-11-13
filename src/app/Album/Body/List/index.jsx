import React from 'react';
import { Scroll } from 'qyrc';
import scss from './index.module.scss';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../store';
import Item from './Item';

export default () => {
  const store = useStore();

  return useObserver(() => (
    <Scroll>
      <div className={scss.list}>
        {store.photos.list.map(v => (
          <Item key={v.id} data={v}/>
        ))}
      </div>
    </Scroll>
  ));
};
