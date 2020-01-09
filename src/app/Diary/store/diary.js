import * as api from '@api';

import { SPIN_CODE } from '@config/consts';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @observable list = [];

  // 获取搜索参数
  getSearchParams = () => ({
    search: {},
    pagination: { current: 1, pageSize: 30 },
  })

  @action
  getDiaries = async () => {
    const { search, pagination } = this.getSearchParams();
    const { list } = await api.getDiaries({
      search,
      pagination,
      spin: SPIN_CODE.APP_DIARY,
    });
    this.list = list;
  }

  // 创建
  @action
  createDiarie = async body => {
    const { search, pagination } = this.getSearchParams();
    const { list } = await api.createDiaries({
      search,
      pagination,
      body: [body],
      spin: SPIN_CODE.APP_DIARY,
    });
    this.list = list;
  }

  // 更新
  @action
  updateDiaries = async (id, body) => {
    const { search, pagination } = this.getSearchParams();
    const { list } = await api.updateDiaries({
      search,
      pagination,
      body: [body],
      conds: { id },
      spin: SPIN_CODE.APP_DIARY,
    });
    this.list = list;
  }
}
