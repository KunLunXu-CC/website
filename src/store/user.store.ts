import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

export default createSlice({
  initialState,
  name: 'user',
  reducers: {
    set: (state, { payload }) => ({ ...state, ...payload }),
  },
});
