import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Base from '../pages/Base/index';
import setting from './setting';

export default () => {
  const routes = setting && setting.map(v => (
    <Route 
      key={v.key}
      path={v.path}
      exact={v.exact} 
      component={v.component}
    />
  ));
  return (
    <Base>
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </Base>
  );
};
