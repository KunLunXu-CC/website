
import { SPIN_CODE, MESSAGE_CODE } from '@config/consts';
import { observable, action, autorun } from 'mobx';
import { message } from '@utils';
import * as api from '@api';

const DEFAULT_TYPE = 'all';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.autorunList, v => autorun(v));
  }

  // 图片列表
  @observable list = [];

  // 当前查询 type
  @observable type = DEFAULT_TYPE;

  // 切换 type
  @action
  toggleType = type => {
    this.type = type;
  }

  // 获取(查询)列表
  @action
  getList = async search => {
    const { list } = await api.getPhotos({
      search,
      spin: SPIN_CODE.APP_ALBUM,
    });
    this.list = list;
  }

  // 删除图片
  @action
  removePhotos = async ({ id }) => {
    // 1. 删除图片
    const res = await api.removePhotos({
      conds: { id },
      search: this.getSearch(),
      spin: SPIN_CODE.APP_ALBUM,
    });
    message({
      code: MESSAGE_CODE.APP_ALBUM,
      message: '文件删除成功!',
    });
    this.list = res.list;
    return res;
  };

  // 反应列表
  autorunList = {
    getList: () => {
      const search = {};
      _.isNumber(this.type) && (search.type = [this.type]);
      this.getList(search);
    },
  };
}
