import { Input } from 'antd';
import { actions } from '@store';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAiChatMutation } from '@store/graphql';

import scss from './index.module.scss';
import List from './List';

// 参考: https://dribbble.com/shots/20298059-Messenger-UI
export default () => {
  const dispatch = useDispatch();
  const [isConnecting, setIsConnecting] = useState(false); // 连接中
  const activeId = useSelector((state) => state.ai.chat.activeId);
  const [createAiChat] = useCreateAiChatMutation();

  const handleSend = useCallback(async (message) => {
    let chatId = activeId;

    if (!activeId) {
      const { data } = await createAiChat({ body: {} });
      const [newChat] = data.createAiChats.change;

      chatId = newChat.id;
      newChat.messages.push({ role: 'user', content: message });

      dispatch(actions.ai.addChat(newChat));
      dispatch(actions.ai.setActiveChat(newChat.id));
    }

    const source = new EventSource(`http://127.0.0.1:4000/demo?message=${message}&chatId=${chatId}`);
    source.addEventListener('open', () => setIsConnecting(true));
    source.addEventListener('error', () => {
      source.close();
      setIsConnecting(false);
    });

    source.addEventListener('message', (event) => {
      if (event.data.trim() === '[DONE]') { // 结束则关闭链接
        source.close();
        setIsConnecting(false);
        return;
      }

      console.log(event.data);
    });
  }, [activeId, createAiChat, dispatch]);

  return (
    <div className={scss.chat}>
      <List />
      <div className={scss.main}>
        <div className={scss.header}>
          header
        </div>
        <div className={scss.session}>
          <div className={scss.view}>
            预览
          </div>
          <Input.TextArea
            rows={1}
            disabled={isConnecting}
          />
          <span onClick={handleSend}>
            发送
          </span>
        </div>
      </div>
    </div>
  );
};


