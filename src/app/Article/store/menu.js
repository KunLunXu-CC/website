import _ from 'lodash';
import { observable, action, reaction } from 'mobx';

import { getTags } from '@api';

const BASE_TAG = {
  id: 'all',
  name: '全部',
  icon: 'icon-all',
};

export default class Store {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable collapsed = false;  // 菜单收缩状态
  @observable tag = BASE_TAG.id;  // 当前 tag
  @observable list = [];       // tag 列表

  @action
  toggleCollapsed= () => {
    this.collapsed = !this.collapsed;
  }

  @action
  setTag = value => {
    this.tag = value;
  }

  @action
  getList = async () => {
    const { list } = await getTags();
    this.list = [BASE_TAG, ... list];
  }
}
