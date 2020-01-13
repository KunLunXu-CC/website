import { login } from '@api';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.login({});
  }

  @observable user = {};
  @observable role = {};
  @observable auth = [];

  // 登录: 返回请求数据以及登录状态
  @action
  login = async ({ account, password }) => {
    const res = await login({ account, password });
    this.user = res.user;
    this.role = res.user.role;
    this.auth = res.user.role.auth;
    return res;
  };
}
