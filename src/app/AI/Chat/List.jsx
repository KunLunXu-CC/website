import { Input } from 'antd';
import { VariableContainer } from '@kunlunxu/brick';

import scss from './list.module.scss';

export default () => (
  <VariableContainer
    layout
    className={scss.list}
    operationList={['right']}
    margin={{ right: '20%' }}
    style={{ height: '100%' }}>
    <Input
      placeholder='检索词'
      addonAfter={(
        <span>
          +
        </span>
      )}
    />
    <div>
      2
    </div>
  </VariableContainer>
);

