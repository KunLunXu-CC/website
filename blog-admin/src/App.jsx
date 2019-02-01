import React from 'react';
import moment from 'moment';
import Router from './route/index';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '@assets/font/fonticon/iconfont.js';
import '@assets/style/coverAntd.scss';
import '@assets/style/common.scss';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default () => (
  <LocaleProvider locale={zh_CN}>
    <Router />
  </LocaleProvider>
);
