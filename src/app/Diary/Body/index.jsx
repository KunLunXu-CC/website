import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';

export default () => (
  <div className={scss.body}>
    <div className={scss.item}>
      <Icon
        type="icon-biji"
        className={scss.icon}
      />
      <span>2019-09-08</span>
    </div>
  </div>
);
