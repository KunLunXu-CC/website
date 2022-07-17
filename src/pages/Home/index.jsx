import React from 'react';

import AppList from './AppList';
import Desktop from './Desktop';
import DockList from './DockList';
import MenuList from './MenuList';

/**
 * 下面所有组件都使用 position: fixed 进行布局
 * MenuList 和 DockList z-index = 1
 * Desktop z-index = -1
 * AppList z-index = 0（默认）
 */
export default () => (
  <>
    <AppList />
    <MenuList />
    <DockList />
    <Desktop />
  </>
);
