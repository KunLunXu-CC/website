import React from 'react';
import Router from './route/index';
import '@assets/font/fonticon/iconfont.js';
import '@assets/style/common.scss';
import '@assets/style/coverAntd.scss';
export default class App extends React.Component{
  render(){
    return (
      <Router />
    );
  }
}
