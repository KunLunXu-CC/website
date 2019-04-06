import React from 'react';
import config from './config';
import { Route, Switch } from 'react-router-dom';

export default () => (
  <Switch>
    {
      config.map(v => (
        <Route 
          key={v.code} 
          path={v.path} 
          exact={v.exact} 
          component={v.page}
        />
      ))
    }
  </Switch>
);
