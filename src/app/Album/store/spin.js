import { observable, action } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable spinning = false;  // 是否加载中

  @action
  open = () => {
    !this.spinning && (this.spinning = true);
  }

  @action
  close = () => {
    this.spinning && (this.spinning = false);
  }
}
