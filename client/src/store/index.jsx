import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import middlewares from './middlewares';

// 1. 创建 store
const store = createStore(reducers, middlewares);

// 2. 定义组件
export default (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);
