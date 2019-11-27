import _ from 'lodash';
import * as api from '@api';
import { observable, action, reaction } from 'mobx';
import { PHOTO_TYPE, TAG_ALL } from '@config/consts';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.getThumbs();
    this.getList();
    _.forIn(this.reactionList, v => reaction(v.data, v.effect));
  }

  @observable list = [];        // 文章列表
  @observable thumbs = [];      // 缩略图
  @observable article = null;   // 缩略图

  // 阅读
  @action
  onRead = article => {
    this.article = { ... article };
  }

  // 获取缩略图
  @action
  getThumbs = async () => {
    const search = { type: [
      PHOTO_TYPE.THUMB.VALUE,
      PHOTO_TYPE.DESKTOP.VALUE,
    ] };
    const { list } = await api.getPhotos({ search });
    this.thumbs = list;
  }

  // 获取列表
  @action
  getList = async (search = this.getSearch()) => {
    const { list } = await this.parent.spin.runTask(async () => (
      await api.getArticles({ search })
    ));
    this.list = list;
  }

  // 获取查询条件
  getSearch = () => {
    const search = {};
    (this.parent.menu.tag !== TAG_ALL.id) &&
    (search.tags = [this.parent.menu.tag]);
    return search;
  };

  // reaction 函数列表
  reactionList = {
    getList: {
      data: this.getSearch,
      effect: search => (this.getList(search)),
    },
  };
}
