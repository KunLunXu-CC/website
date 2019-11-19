import { computed } from 'mobx';
import dockConfig from '@config/dock';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @computed
  get list () {
    return dockConfig.filter(v => (
      this.parent.user.auth.find(ele => ele.code === v.key)
    ));
  }
}
