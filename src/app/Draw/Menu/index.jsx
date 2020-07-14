import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { MENU_LIST } from '../consts';

export default () => (
  <div className={scss.menu}>
    {MENU_LIST.map(v => (
      <div key={v.key} className={scss.item}>
        <Icon type={v.icon} />
      </div>
    ))}
  </div>
);
