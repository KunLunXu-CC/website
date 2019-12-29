import React from 'react';
import Body from './Body';
import Side from './Side';
import Spin from './Spin';
import Message from './Message';
import StoreProvider from './store';
import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <div className={scss['layout-side']}><Side/></div>
      <div className={scss['layout-body']}><Body/></div>
      <Message/>
      <Spin/>
    </div>
  </StoreProvider>
);
