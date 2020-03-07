import React from 'react';
import Bill from './Bill';
import BodyIndex from './BodyIndex';
import scss from './index.module.scss';
import { Scroll } from 'qyrc';

export default () => (
  <Scroll className={scss.stats}>
    <Bill/>
    <BodyIndex/>
  </Scroll>
);
