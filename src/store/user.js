import _ from 'lodash';
import { login } from '@api';
import { matchPath } from 'react-router-dom';
import { observable, action, autorun, toJS } from 'mobx';

import { RESCODE } from '@config/consts';

export default class Store {
  constructor(){
    this.login({});
    _.forIn(this.autorun, v => autorun(v));    
  }

  @observable user = {};
  @observable role = {};
  @observable auth = {};

  // 登录: 返回请求数据以及登录状态
  @action
  login = ({ account, password }) => login({ account, password }).then(res => {
    this.user = res.user;
    this.role = res.user.role;
    this.auth = res.user.role.auth;
    return { res, logined: RESCODE.SUCCESS.VALUE === res.rescode };
  });

  // 自动运行函数列表
  autorun = {
    print: () => {
      console.group('%c[store]user', 'color: green;');
      console.log('user: ', toJS(this.user));
      console.log('role: ', toJS(this.role));
      console.log('auth: ', toJS(this.auth));
      console.groupEnd();
    }
  };
}