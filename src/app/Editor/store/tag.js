import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import { getTags } from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable tags = [];

  // 查询 tag
  @action
  getTags = async () => {
    const res = await getTags();
    this.tags = _.get(res, 'list') || [];
  }

  // 创建虚拟 tag 点击编辑用来占位
  @action
  addFictitiousTag = (parent) => {
    const { id, name } = parent;
    this.tags = [
      { editor: true, id: 'new', name: void 0, parent: { id, name } },
      ...this.tags,
    ];
  }
};
