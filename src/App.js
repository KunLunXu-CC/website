import React from 'react';
import moment from 'moment';
import Router from './Route';
import Store from '@store/index';
import zhCN from 'antd/es/locale/zh_CN';

import { ConfigProvider } from 'antd';

import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default () => (
  <ConfigProvider locale={zhCN}>
    <Store>
      <Router />
    </Store>
  </ConfigProvider>
);
