import _ from 'lodash';
import { observable, action } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable spinning = false;  // 是否加载中

  // 开启: 加载状态
  @action
  open = () => {
    !this.spinning && (this.spinning = true);
  }

  // 关闭: 加载状态
  @action
  close = () => {
    this.spinning && (this.spinning = false);
  }

  // 执行异步任务: async
  @action
  runTask = async task => {
    if (!_.isFunction(task)) {
      return false;
    }
    this.open();
    const res = await task();
    this.close();
    return res;
  }
}
