import React from 'react';
import StoreProvider from './store';
import scss from './index.module.scss';
import Body from './Body';
import Side from './Side';
import Menu from './Menu';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <div className={scss['layout-menu']}><Menu/></div>
      <div className={scss['layout-body']}><Body/></div>
      <div className={scss['layout-side']}><Side/></div>
    </div>
  </StoreProvider>
);
