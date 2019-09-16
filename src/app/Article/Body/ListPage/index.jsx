import React from 'react';
import scss from './index.module.scss';

import Item from './Item';

export default () => {
  return (
    <div className={scss['search-page']}>
      <Item />
      测试打印
    </div>
  );
}
