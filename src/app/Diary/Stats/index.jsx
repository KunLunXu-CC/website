import React from 'react';
import Bill from './Bill';
import BodyIndex from './BodyIndex';
import scss from './index.module.scss';

export default () => (
  <div className={scss.stats}>
    <Bill />
    <BodyIndex />
  </div>
);
