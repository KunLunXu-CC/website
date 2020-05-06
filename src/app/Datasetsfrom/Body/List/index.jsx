import React from 'react';
import Item from './Item';
import scss from './index.module.scss';
import { Scroll } from 'qyrc';

const data = new Array(15).fill(1);

export default () => (
  <Scroll className={scss.list}>
    {_.chunk(data, 3).map((children, index) => (
      <div key={index} className={scss.row}>
        {children.map((v, key) => (
          <Item key={key} data={v}/>
        ))}
      </div>
    ))}
  </Scroll>
);
