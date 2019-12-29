import React from 'react';
import Body from './Body';
import Side from './Side';
import Spin from './Spin';
import StoreProvider from './store';

import { MESSAGE_CODE } from '@config/consts';

import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <div className={scss['layout-side']}><Side/></div>
      <div className={scss['layout-body']}><Body/></div>
      <div id={MESSAGE_CODE.APP_ALBUM}/>
      <Spin/>
    </div>
  </StoreProvider>
);
