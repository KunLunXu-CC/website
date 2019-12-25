import { observable, action } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable list = [];

  @action
  open = ({ code, ... rest }) => {
    const find = this.list.find(v => v.code === code) || { code };
    list.push({ ... find, ... rest });
  }

  @action
  close = (code) => {
    this.list = this.list.filter(v => v.code !== code);
  }
}
