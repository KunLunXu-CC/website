import React from 'react';
import Body from './Body';
import Spin from './Spin';
import Modal from './Modal';
import Header from './Header';
import StoreProvider from './store';
import scss from './index.module.scss';

import { MESSAGE_CODE } from '@config/consts';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <Header/>
      <div className={scss.body}>
        <Body/>
        <Modal/>
      </div>
      <div id={MESSAGE_CODE.APP_EDITOR}/>
      <Spin/>
    </div>
  </StoreProvider>
);
