import { observable, action } from 'mobx';

export default class {
  constructor (parent) {
    this.parent = parent;
  }

  @observable spinning = {};

  // 开启: 加载状态
  @action
  open = code => {
    !this.spinning[code] && (this.spinning[code] = true);
  }

  // 关闭: 加载状态
  @action
  close = code => {
    if (!code) {
      this.spinning = {};
    } else {
      this.spinning[code] && (this.spinning[code] = false);
    }
  }

  // 执行异步任务: async
  // @action
  // runTask = async task => {
  //   if (!_.isFunction(task)) {
  //     return false;
  //   }
  //   this.open();
  //   const res = await task();
  //   this.close();
  //   return res;
  // }
}
