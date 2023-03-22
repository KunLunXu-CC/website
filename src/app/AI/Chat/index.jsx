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
  const [sendMessage, setSendMessage] = useState();
  const [isConnecting, setIsConnecting] = useState(false); // 连接中
  const activeId = useSelector((state) => state.ai.chat.activeId);
  const [createAiChat] = useCreateAiChatMutation();

  const handleSend = useCallback(async () => {
    let chatId = activeId;

    if (!activeId) {
      const { data } = await createAiChat({ body: {
        messages: [{ role: 'user', content: sendMessage }],
      } });

      const [newChat] = data.createAiChats.change;
      chatId = newChat.id;

      dispatch(actions.ai.addChat(newChat));
      dispatch(actions.ai.setActiveChat(newChat.id));
    }

    const source = new EventSource(`http://127.0.0.1:4000/demo?message=${sendMessage}&chatId=${chatId}`);
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
  }, [activeId, createAiChat, dispatch, sendMessage]);

  return (
    <div className={scss.chat}>
      <List />
      <div className={scss.session}>
        <div className={scss.view}>
          111
        </div>
        <div className={scss.edit}>
          <Input.TextArea
            bordered={false}
            value={sendMessage}
            disabled={isConnecting}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <span
            onClick={handleSend}
            className={scss['send-btn']}>
            发送
          </span>
        </div>

      </div>
    </div>
  );
};


