import React from 'react';
import { Scroll } from 'qyrc';

import Item from './Item';
import scss from './index.module.scss';

const mock = [
  {},
  {},
  {},
  {},
  {},
  {},
];

export default () => (
  <Scroll className={scss.list}>
    {mock.map((value, index) => (<Item key={index} data={value}/>))}
  </Scroll>
);
