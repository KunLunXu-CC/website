import React from 'react';
import reactDom from 'react-dom';

import Store from '@store/index';
import console from './console';
import Router from './Route';

import '@assets/font/fonticon/iconfont';

// 控制台配置
console();

reactDom.render((
  <Store>
    <Router />
  </Store>
), document.getElementById('root'));
