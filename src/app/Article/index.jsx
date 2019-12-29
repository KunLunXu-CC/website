import React from 'react';
import Body from './Body';
import Side from './Side';
import Menu from './Menu';
import Spin from './Spin';
import Message from './Message';
import StoreProvider from './store';
import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <div className={scss['layout-menu']}><Menu/></div>
      <div className={scss['layout-body']}><Body/></div>
      <div className={scss['layout-side']}><Side/></div>
      <Spin/>
      <Message/>
    </div>
  </StoreProvider>
);
