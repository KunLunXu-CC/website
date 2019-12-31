import React from 'react';
import moment from 'moment';
import Router from './Route';
import Store from '@store/index';
import reactDom from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';

import { ConfigProvider } from 'antd';

import '@assets/font/fonticon/iconfont';
import 'moment/locale/zh-cn';
import './console';

moment.locale('zh-cn');

const App = (
  <ConfigProvider locale={zhCN}>
    <Store>
      <Router />
    </Store>
  </ConfigProvider>
);

reactDom.render(App, document.getElementById('root'));
