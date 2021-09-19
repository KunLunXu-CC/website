import React from 'react';
import Body from './Body';
import Side from './Side';
import Tips from './Tips';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <div className={scss['layout-side']}>
      <Side />
    </div>
    <div className={scss['layout-body']}>
      <Body />
    </div>
    <Tips />
  </div>
);
