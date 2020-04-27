import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Input } from 'antd';

export default () => (
  <div className={scss.header}>
    <Input
      size="large"
      placeholder="查询"
      onPressEnter={() => {}}
      prefix={<Icon type="icon-search"/>}
    />
  </div>
);
