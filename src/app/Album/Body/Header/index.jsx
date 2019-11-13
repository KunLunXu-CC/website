import React from 'react';
import { Icon } from 'qyrc';
import { Input, Badge } from 'antd';
import scss from './index.module.scss';

export default () => (
  <div className={scss.header}>
    <div className={scss.search}>
      <Input
        size="large"
        placeholder="查询"
        onPressEnter={() => {}}
        prefix={<Icon type="icon-search" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    </div>
    <div className={scss.notice}>
      <Badge dot>
        <Icon type="icon-notice" />
      </Badge>
    </div>
  </div>
);
