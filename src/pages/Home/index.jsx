import React, { Fragment } from 'react';

import DockList from './DockList/index';
import AppList from './AppList/index';
import Desktop from './Desktop/index';

export default () => (
  <Fragment>
    <DockList/>
    <Desktop/>
    <AppList />
  </Fragment>
);
