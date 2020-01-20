import React from 'react';
import Body from './Body';
import Side from './Side';
import Menu from './Menu';
import Spin from './Spin';
import scss from './index.module.scss';

import { VariableBlock } from 'qyrc';
import { MESSAGE_CODE } from '@config/consts';

export default () => (
  <div className={scss.layout}>
    <VariableBlock
      margin={{ right: '80%' }}
      operationList={['right']}
      style={{ height: '100%' }}
      defaultParams={{ width: 120 }}
      constraintSize={{ width: 70 }}
      className={scss['layout-menu']}>
      <Menu/>
    </VariableBlock>
    <div className={scss['layout-body']}>
      <Body/>
    </div>
    <div className={scss['layout-side']}>
      <Side/>
    </div>
    <div id={MESSAGE_CODE.APP_ARTICLE}/>
    <Spin/>
  </div>
);
