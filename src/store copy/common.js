import * as api from '@api';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @observable publicKey = null;

  // 获取公钥
  @action
  getPublicKey = async () => {
    const { data } = await api.getPublicKey();
    return data;
  }
}
