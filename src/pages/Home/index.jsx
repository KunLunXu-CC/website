import React, { Fragment } from 'react';

import DockList from './DockList';
import MenuList from './MenuList';
import AppList from './AppList';
import Desktop from './Desktop';

export default () => (
  <Fragment>
    <MenuList/>
    <DockList/>
    <Desktop/>
    <AppList />
  </Fragment>
);
