import React from 'react';
import Body from './Body';
import Side from './Side';
import Menu from './Menu';
import Tips from './Tips';
import scss from './index.module.scss';

import { VariableContainer } from 'qyrc';

export default () => (
  <div className={scss.layout}>
    <VariableContainer
      margin={{ right: '80%' }}
      operationList={['right']}
      style={{ height: '100%' }}
      defaultParams={{ width: 120 }}
      constraintSize={{ width: 70 }}
      className={scss['layout-menu']}>
      <Menu/>
    </VariableContainer>
    <div className={scss['layout-body']}>
      <Body/>
    </div>
    <div className={scss['layout-side']}>
      <Side/>
    </div>
    <Tips/>
  </div>
);
