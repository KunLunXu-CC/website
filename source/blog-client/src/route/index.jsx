import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  );
};
