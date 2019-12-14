import React from 'react';
import { Icon } from 'qyrc';

import Date from './Date';
import User from './User';
import scss from './index.module.scss';

export default () => (
  <div className={`${scss.menu} ${scss['menu-auto-hiding']}`}>
    <div className={scss.body}>
      <Date/>
      <Icon type="icon-wifi"/>
      <Icon type="icon-dianliang"/>
      <User/>
    </div>
  </div>
);
