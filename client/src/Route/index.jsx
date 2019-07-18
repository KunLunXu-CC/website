import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import config from './config';

export default () => (
  <Router>
    <Switch>
      {
        config.map(v => (
          <Route
            key={v.path}
            path={v.path}
            exact={v.exact}
            component={v.component}
          />
        ))
      }
    </Switch>
  </Router>
);
