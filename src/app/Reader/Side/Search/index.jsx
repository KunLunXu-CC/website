import React from 'react';
import scss from './index.module.scss';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default () => (
  <Input
    placeholder="搜索"
    className={scss.search}
    prefix={<SearchOutlined />}
  />
);
