import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.item}>
    <div className={scss.top}>
      <div className={scss.content}>
        <div className={scss.label}>
          上午
        </div>
        <div className={scss.value}>
          1
        </div>
      </div>
    </div>
    <div className={scss.bottom}>
      <div></div>
      <div></div>
    </div>
  </div>
);
