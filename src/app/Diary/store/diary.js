import * as api from '@api';

import { message } from '@utils';
import { observable, action } from 'mobx';
import { SPIN_CODE, MESSAGE_CODE } from '@config/consts';

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
    message({
      message: '创建成功!',
      code: MESSAGE_CODE.APP_EDITOR,
    });
    this.list = list;
  }

  // 更新
  @action
  updateDiaries = async (id, body) => {
    const { search, pagination } = this.getSearchParams();
    const { list } = await api.updateDiaries({
      body,
      search,
      pagination,
      conds: { id },
      spin: SPIN_CODE.APP_DIARY,
    });
    message({
      message: '修改成功!',
      code: MESSAGE_CODE.APP_EDITOR,
    });
    this.list = list;
  }
}
