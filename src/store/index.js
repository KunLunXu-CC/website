import React from 'react'
import getReducer from './getReducer';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'

import photos from './global/model';
import application from './application/model';
import createSagaMiddleware from 'redux-saga';
import { helloSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

const store = createStore(
  getReducer([
    photos,
    application,
  ]),
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);
sagaMiddleware.run(helloSaga);

export default props => (
  <Provider store={store}>
    {props.children}
  </Provider>
);
