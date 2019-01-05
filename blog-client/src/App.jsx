import React from 'react';
import Router from './route/index';
import Store from './store/index';
import '@assets/font/fonticon/iconfont';
import '@assets/style/common.less';
export default class App extends React.Component{
  render(){
    return (
      <Store>
        <Router />
      </Store>
    );
  }
}
