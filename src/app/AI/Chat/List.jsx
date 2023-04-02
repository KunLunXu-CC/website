import { Button } from 'antd';
import { actions } from '@store';
import { useCallback, useEffect } from 'react';
import { useGetAiChatsQuery } from '@store/graphql';
import { VariableContainer } from '@kunlunxu/brick';
import { useDispatch, useSelector } from 'react-redux';

import scss from './list.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetAiChatsQuery();

  const { chatList } = useSelector((state) => ({
    chatList: state.ai.chat.list,
  }));

  const handleAdd = useCallback(() => {
    dispatch(actions.ai.setActiveChat(null));
  }, [dispatch]);

  const handleClick = useCallback((item) => {
    dispatch(actions.ai.setActiveChat(item));
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
      margin={{ right: '50%' }}
      style={{ height: '100%' }}>
      <Button
        block
        type="primary"
        onClick={handleAdd}>
        新增会话
      </Button>
      {chatList.map((v) => {
        const text = v.name ?? v.messages[0]?.content;

        if (!text) {
          return null;
        }

        return (
          <div
            key={v.id}
            className={scss.item}
            onClick={handleClick.bind(null, v)}>
            {v.name ?? v.messages[0]?.content}
          </div>
        );
      })}
    </VariableContainer>
  );
};

