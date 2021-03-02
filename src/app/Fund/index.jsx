import React from 'react';
import Free from './Free';
import Detail from './Detail';

import scss from './index.module.scss';
export default () => (
  <div className={scss.fund}>
    <Free/>
    <Detail/>
  </div>
);
