import React from 'react';
import scss from './index.module.scss';
import { VariableContainer } from 'qyrc';

export default () => (
  <VariableContainer
    margin={{ top: 20 }}
    operationList={['top']}
    constraintSize={{ height: 100 }}
    style={{ width: '100%', transform: 'translate(0px, 0px)' }}>
    <div className={scss.editor}>

    </div>
  </VariableContainer>
);
