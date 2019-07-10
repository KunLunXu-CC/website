import Home from '@home';
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Store from '@store/index';
import '@assets/style/common.scss';
import '@assets/font/fonticon/iconfont';

export default () => (
  <Store>
    <Router>
      <Route component={Home}/>
    </Router>
  </Store>
);
