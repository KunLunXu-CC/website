import React from 'react';
import { VariableBlock } from 'qyrc';
import StoreProvider from './store';

import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Header from './Header';

import scss from './index.module.scss';

export default () => (
  <StoreProvider>
    <div className={scss['editor']}>
      <div className={scss['editor-side']}><Side/></div>
      <div className={scss['editor-body']}>
        <div className={scss['editor-body-header']}><Header/></div>
        <div className={scss['editor-body-middle']}>
          <VariableBlock
            operationList={['right']}
            style={{ height: '100%' }}
            margin={{ right: '40%' }}
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
    </div>
  </StoreProvider>
);
