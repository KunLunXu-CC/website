
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
    const { list } = await this.parent.spin.runTask(async () => (
      await api.getPhotos({ search })
    ));
    this.list = list;
  }

  // 删除图片
  @action
  removePhotos = async ({ id }) => {
    // 1. 删除图片
    const res = await this.parent.spin.runTask(async () => (
      await api.removePhotos({
        conds: { id },
        search: this.getSearch(),
      })
    ));
    this.parent.message.setMessage({
      type: 'success',
      message: '文件删除成功!',
    });
    this.list = res.list;
    return res;
  };

  // 获取搜索条件
  getSearch = () => {
    const search = {};
    _.isNumber(this.type) && (search.type = [this.type]);
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
