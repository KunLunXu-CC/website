import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Scroll, Icon } from 'qyrc';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

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
