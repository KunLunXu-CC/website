import React from 'react';

import { Input, Icon } from 'antd';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['header']}>
      <Input.Search
        placeholder="搜索"
        onSearch={value => console.log(value)}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
        }}
      />
    </div>
  );
};
