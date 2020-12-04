import React from 'react';
import scss from './index.module.scss';

import { MENUS } from '../consts';

export default () => (
  <div className={scss.menu}>
    {MENUS.map(v => (
      <div key={v.key} className={scss.item}>
        {v.title}
      </div>
    ))}
  </div>
);
