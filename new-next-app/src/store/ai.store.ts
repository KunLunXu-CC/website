import { cloneDeep, last } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

interface Message {
  role: string
  content: string
}
interface Chat {
  id: string
  name: string
  messages: Message[]
}

interface State {
  chat: {
    list: Chat[]
    active: Chat | null
  }
}

export const initialState: State = {
  chat: {
    list: [],
    active: null,
  },
};

export default createSlice({
  initialState,
  name: 'ai',
  reducers: {
    setChatList: (state, { payload: list }) => ({
      ...state,
      chat: { ...state.chat, list },
    }),
    addChat: (state, { payload: chat }): any => ({
      ...state,
      chat: {
        ...state.chat,
        list: [...state.chat.list, chat],
      },
    }),
    setActiveChat: (state, { payload: active }): any => ({
      ...state,
      chat: { ...state.chat, active },
    }),

    appendChatMessage: (state, { payload: content }): any => {
      const newChatList: Chat[] = cloneDeep(state.chat.list);

      const currentChar = newChatList.find(
        (v) => v.id === state.chat.active?.id,
      ) as Chat;

      const lastMessage = last(currentChar.messages) as Message;

      if (lastMessage?.role === 'user') {
        currentChar.messages.push({ role: 'assistant', content });
      } else {
        lastMessage.content = `${lastMessage.content || ''}${content}`;
      }

      return {
        ...state,
        chat: { ...state.chat, list: newChatList },
      };
    },
  },
});
