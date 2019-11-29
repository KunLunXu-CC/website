import React from 'react';
import { Icon } from 'qyrc';

import Date from './Date';
import scss from './index.module.scss';

export default () => (
  <div className={scss.menu}>
    <Date/>
    <Icon type="icon-wifi"/>
    <Icon type="icon-dianliang"/>
    <Icon type="icon-caidan"/>
  </div>
);
