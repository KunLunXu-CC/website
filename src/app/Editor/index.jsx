import React from 'react';
import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Modal from './Modal';
import Spin from './Spin';
import Header from './Header';
import StoreProvider from './store';

import { MESSAGE_CODE } from '@config/consts';
import { VariableBlock } from 'qyrc';

import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss.editor}>
      <div className={scss['editor-side']}><Side/></div>
      <div className={scss['editor-body']}>
        <div className={scss['editor-body-header']}><Header/></div>
        <div className={scss['editor-body-middle']}>
          <VariableBlock
            margin={{ right: '20%' }}
            operationList={['right']}
            style={{ height: '100%' }}
            constraintSize={{ width: 4 }}
            className={scss['editor-body-middle-menu']} >
            <Menu/>
          </VariableBlock>
          <div className={scss['editor-body-middle-work']}><Work/></div>
        </div>
      </div>
      <div id={MESSAGE_CODE.APP_EDITOR}/>
      <Modal/>
      <Spin/>
    </div>
  </StoreProvider>
);
