import _ from 'lodash';
import { observable, action, autorun } from 'mobx';
// import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

const DEFAULT_TYPE = 'all';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.autorun, v => autorun(v));
  }

  // 图片列表
  @observable list = [];

  // 当前查询 type
  @observable type = DEFAULT_TYPE;

  // 切换 type
  @action
  toggleType = type => {
    this.type = Number(type);
  }

  // 自动运行列表
  autorun = {
    // 获取图片列表
    getphotos: async () => {
      const search = {};
      this.type !== DEFAULT_TYPE && (search.type = this.type);
      const { list } = await api.getPhotos({ search });
      this.list = list;
    },
  };
}
