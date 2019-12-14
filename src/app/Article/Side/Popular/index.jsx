import React from 'react';
import { Scroll, Icon } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import Item from './Item';
import { useStore } from '../../store';
import scss from './index.module.scss';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <div className={scss.popular}>
      <div className={scss.title}>
        <Icon type="icon-remen" /> TOP 10
      </div>
      <Scroll className={scss.scroll}>
        {store.article.tops.map((value, index) => (
          <Item key={index} data={value}/>
        ))}
      </Scroll>
    </div>
  ));
};
