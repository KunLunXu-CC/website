import React from 'react';
import { VariableBlock } from 'qyrc';
import StoreProvider from './store';

import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Modal from './Modal';
import Header from './Header';

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
            <div className={scss['editor-body-middle-menu-body']}>
              <Menu/>
            </div>
          </VariableBlock>
          <div className={scss['editor-body-middle-work']}>
            <div className={scss['editor-body-middle-work-body']}>
              <Work/>
            </div>
          </div>
        </div>
      </div>
      <Modal/>
    </div>
  </StoreProvider>
);
