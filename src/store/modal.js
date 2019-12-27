import { observable, action } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable list = [];

  @action
  open = ({ code, ... rest }) => {
    const find = this.list.find(v => v.code === code) || { code };
    this.list.push({ ... find, ... rest });
  }

  @action
  close = code => {
    this.list = code
      ? this.list.filter(v => v.code !== code)
      : [];
  }
}
