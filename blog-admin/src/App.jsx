import React from 'react';
import { Provider } from 'mobx-react';
import Router from './route/index';
import store from './store/index';
import '@assets/font/fonticon/iconfont';
import '@assets/style/common.scss';
export default class App extends React.Component{
  render(){
    return (
      <Provider {...store}>
        <Router />
      </Provider>
    );
  }
}
