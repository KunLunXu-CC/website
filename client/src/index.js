import React from 'react';
import reactDom from 'react-dom';

import Store from '@store/index';
import Router from './Route';

import '@assets/style/common.scss';
import '@assets/font/fonticon/iconfont';

reactDom.render((
  <Store>
    <Router />
  </Store>
), document.getElementById('root'));
