import _ from 'lodash';
import { observable, action, reaction } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable spinning = false;  // 是否加载中

  @action
  open = () => {

  }
}
