import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  chat: {
    list: [],
    active: null,
  },
};

export default createSlice({
  initialState,
  name: 'monitoring',
  reducers: {},
});
