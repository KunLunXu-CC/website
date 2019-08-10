import React from 'react';

import { Input, Icon } from 'antd';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['header']}>
      <Input
        placeholder="搜索"
        // prefix={<Icon type="search" style={{ color: '#fff' }}/>}
        className={scss['header-input']}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
        }}
      ></Input>
    </div>
  );
};
