import React from 'react';
import scss from './index.module.scss';
import { VariableContainer } from 'qyrc';

export default () => {
  return (
    <VariableContainer
      className={scss.free}
      margin={{ right: '20%' }}
      operationList={['right']}
      style={{ height: '100%' }}
      defaultParams={{ width: 200 }}>
      11111111
    </VariableContainer>
  );
};
