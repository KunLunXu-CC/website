import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';

export default () => (
  <div className={scss['no-more']}>
    <Icon
      className={scss.icon}
      type="icon-meiyougengduo"
    />
    <div className={scss.info}>
      别扯了, 没有更多了
    </div>
  </div>
);
