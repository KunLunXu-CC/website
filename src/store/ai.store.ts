import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
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
  },
});
