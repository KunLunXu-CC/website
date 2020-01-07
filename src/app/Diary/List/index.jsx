import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';

export default () => (
  <div className={scss.list}>
    <div className={scss.header}>
      <Icon type="icon-xinzeng"/>
    </div>
    <div className={scss.item}>
      <div className={scss.body}>
        2019-09-09
      </div>
    </div>
  </div>
);
