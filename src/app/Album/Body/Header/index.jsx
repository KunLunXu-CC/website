import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Input, Badge } from 'antd';

export default () => (
  <div className={scss.header}>
    <div className={scss.search}>
      <Input
        size="large"
        placeholder="查询"
        onPressEnter={() => {}}
        prefix={<Icon type="icon-search"/>}
      />
    </div>
    <div className={scss.notice}>
      <Badge dot>
        <Icon type="icon-notice" />
      </Badge>
    </div>
  </div>
);
