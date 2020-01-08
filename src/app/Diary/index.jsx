import React from 'react';
import Body from './Body';
import Header from './Header';
import Modal from './Modal';
import StoreProvider from './store';
import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss.layout}>
      <Header/>
      <div className={scss.body}>
        <Body/>
        <Modal/>
      </div>
    </div>
  </StoreProvider>
);
