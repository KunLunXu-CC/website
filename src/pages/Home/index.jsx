import React, { Fragment } from 'react';

import DockList from './DockList';
import MenuList from './MenuList';
import AppList from './AppList';
import Desktop from './Desktop';

/**
 * 下面所有组件都使用 position: fixed
 * MenuList 和 DockList z-index = 1
 * Desktop z-index = -1
 * AppList z-index = 0（默认）
 */
export default () => (
  <Fragment>
    <AppList />
    <MenuList/>
    <DockList/>
    <Desktop/>
  </Fragment>
);
