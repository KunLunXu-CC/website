import React from 'react';

import Toc from './Toc';
import Popular from './Popular';
import scss from './index.module.scss';

export default () => (
  <div className={scss.side}>
    <Toc />
    <Popular />
  </div>
);
