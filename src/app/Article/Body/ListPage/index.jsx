import React from 'react';
import Item from './Item';
import NoMore from './NoMore';
import scss from './index.module.scss';

import { Empty } from 'antd';
import { Scroll } from 'qyrc';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Scroll className={scss.scroll}>
      {store.article.list.length > 0 ?
        store.article.list.map((value, index) => (
          <Item
            data={value}
            key={value.id}
            align={index % 2 !== 0 ? 'right' : 'left'}
          />
        )) :
        <Empty/>
      }
      {store.article.list.length > 0 ?
        <NoMore/> : null
      }
    </Scroll>
  ));
};
