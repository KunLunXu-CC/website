import React from 'react';
import Store from '@store';
import Home from './Home';
import { 
  Route,
  BrowserRouter as Router, 
} from 'react-router-dom';
import '@assets/style/common.scss';
import '@assets/font/fonticon/iconfont';

export default () => (
  <Store>
    <Router>
      <Route component={Home}/>
    </Router>
  </Store>
);
