import React from 'react';
import { Scroll } from 'qyrc';
import scss from './index.module.scss';

import Item from './Item';

export default () => {
  return (
    <Scroll>
      <div className={scss['list']}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </Scroll>
  );
}
