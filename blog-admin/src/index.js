import React from 'react';
import reactDom from 'react-dom';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import App from './App';
reactDom.render(
  <LocaleProvider locale={zh_CN}><App /></LocaleProvider>, 
  document.getElementById('root')
);
