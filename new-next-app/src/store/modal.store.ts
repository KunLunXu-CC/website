import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

export default createSlice({
  initialState,
  name: 'modal',
  reducers: {
    // 开启弹窗: modal[code]
    open: (state, { payload: modal }) => {
      const { code, ...rest } = modal;
      return code ? { ...state, [code]: rest } : state;
    },

    // 关闭弹窗: modal[code]
    close: (state, { payload: code }) => (
      code ? { ...state, [code]: void 0 } : {}
    ),
  },
});
