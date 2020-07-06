import React from 'react';
import scss from './index.module.scss';

import { VariableContainer } from 'qyrc';

export default () => (
  <VariableContainer
    operationList={['left']}
    margin={{ right: '20%' }}
    style={{ height: '100%', transform: 'translate(0px, 0px)' }}
    className={scss.preview}
    constraintSize={{ width: 0 }}>
    预览
  </VariableContainer>
);
