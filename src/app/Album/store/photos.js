import _ from 'lodash';
import { observable, action, reaction } from 'mobx';
// import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reactionList, v => reaction(v.data, v.effect));
  }

  // 图片列表
  @observable list = [];

  // 当前查询 type
  @observable type = null;

  // 切换 type
  @action
  toggleType = type => {
    this.type = type;
  }

  // 设置(查询)列表
  @action
  setList = async (search = this.getSearch()) => {
    const { list } = await api.getPhotos({ search });
    this.list = list;
  }

  // 获取搜索条件
  getSearch = () => {
    const search = {};
    _.isNumber(this.type) && (search.type = this.type);
    return search;
  }

  // 反应列表
  reactionList = {
    setList: {
      data: this.getSearch,
      effect: this.setList,
    },
  };
}
