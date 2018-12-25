import React from 'react';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'; 

const middlewares = applyMiddleware(thunk, logger);
const store = createStore(reducers, middlewares);
export default class Store extends React.Component{
  render(){
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}
