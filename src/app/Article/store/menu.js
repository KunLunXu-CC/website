import { observable, action, reaction } from 'mobx';
import { TAG_ALL } from '@config/consts';
import { getTags } from '@api';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable tag = TAG_ALL.id;  // 当前 tag
  @observable list = [];       // tag 列表

  @action
  setTag = value => {
    this.tag = value;
  }

  @action
  getList = async () => {
    const { list } = await getTags();
    this.list = [TAG_ALL, ... list];
  }
}
