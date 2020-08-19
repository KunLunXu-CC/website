import './console';
import React from 'react';
import Store from '@model';
import moment from 'moment';
import Router from './Router';
import reactDom from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import '@assets/style';

import { ConfigProvider } from 'antd';
moment.locale('zh-cn');

reactDom.render(
  <ConfigProvider locale={zhCN}>
    <Store>
      <Router />
    </Store>
  </ConfigProvider>,
  document.getElementById('root')
);
