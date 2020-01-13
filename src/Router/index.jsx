import React from 'react';
import config from './config';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

export default () => (
  <Router>
    <Switch>
      {config.map(v => (
        <Route
          key={v.path}
          path={v.path}
          exact={v.exact}
          component={v.component}
        />
      ))}
    </Switch>
  </Router>
);
