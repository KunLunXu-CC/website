import React from 'react';
import scss from './index.module.scss';
import { VariableContainer } from 'qyrc';

export default () => (
  <VariableContainer
    operationList={['right', 'top']}
    margin={{ top: 20 }}
    constraintSize={{  }}>
    <div className={scss.editor}>

    </div>
  </VariableContainer>
);
