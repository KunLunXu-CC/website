import { actions } from '@store';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { VariableContainer } from '@kunlunxu/brick';
import { useGetAiChatsQuery } from '@store/graphql';

import scss from './list.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetAiChatsQuery();

  const handleAdd = useCallback(() => {
    dispatch(actions.ai.setActiveChat(null));
  }, [dispatch]);

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
      <div onClick={handleAdd}>
        +
      </div>
    </VariableContainer>
  );
};

