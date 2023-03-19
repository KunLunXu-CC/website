import { Input } from 'antd';
import { actions } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { VariableContainer } from '@kunlunxu/brick';
import { useGetAiChatsQuery } from '@store/graphql';

import scss from './list.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetAiChatsQuery();

  // 读取数据
  useEffect(() => {
    dispatch(actions.ai.setChatList(data?.aiChats.list ?? []));
  }, [data, dispatch]);

  return (
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
};

