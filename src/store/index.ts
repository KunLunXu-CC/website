import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit';
import { api as graphqlApi } from '@/store/graphql';

// 1. 加载所有 *.store.js 文件
const files = require.context('../', true, /store\.ts/);

// 2. 收集 reducer、action
export const { reducer, actions } = files.keys().reduce((total, filePath) => {
  // 2.1 加载 *.store.js 文件内容
  const slice = files(filePath).default;

  // 2.2 组装数据
  total.reducer[slice.name] = slice.reducer;
  total.actions[slice.name] = slice.actions;
  return total;
}, {
  reducer: {},
  actions: {},
} as {
  reducer: any,
  actions: { [key: string]: any }
});

const store = configureStore({
  reducer: {
    ...reducer,
    [graphqlApi.reducerPath]: graphqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    graphqlApi.middleware,
    logger,
  ],
});

export type RootState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch

export default store;
