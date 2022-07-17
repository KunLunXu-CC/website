import './console';
import React from 'react';
import Store from '@model';
import moment from 'moment';
import Router from './Router';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import 'moment/locale/zh-cn';
import '@assets/style';

moment.locale('zh-cn'); // 时区设置

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={zhCN}>
    <Store>
      <Router />
    </Store>
  </ConfigProvider>,
);
