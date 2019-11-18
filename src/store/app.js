import _ from 'lodash';
import apps from '@app/index';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.init();
  }

  /**
   * 应用列表
   * 1. 包含 app 基本配置(参考 src/app/index.js)
   * 2. isMin 表示应用是否是最小化
   */
  @observable list = [];

  // 初始化：打开默认开启的弹窗
  @action
  init = () => {
    const rest = apps.filter(v => v.defaultOpen).map(v => ({
      ... v,
      isMin: false,
    }));
    this.list = [... this.list, ... rest];
  }

  /**
   * 开启 app
   * @param {Object} app 要打开应用配置
   */
  @action
  open = app => {
    const current = this.list.find(v => (v.key === app.key));
    if (!!current) {
      this.minimize(current);
    } else {
      const newApp = apps.find(v => v.key === app.key);
      !!app && (this.list = [... this.list, { ... newApp, isMin: false }]);
    }
  }

  /**
 * 关闭 app
 * @param {Object} app 当前应用配置
 */
  @action
  close = app => {
    this.list = this.list.filter(v => v.key !== app.key);
  };

  /**
   * 最小化（切换）
   * @param {Object} app 当前应用
   */
  @action
  minimize = app => {
    this.list = this.list.map(v => ({
      ... v,
      isMin: v.key === app.key ? !v.isMin : v.isMin,
    }));
  };

  /**
   * 应用切换: 开启多个应用时, 点击下层应用将切换至顶层
   * @param {Object} app 当前应用配置
   */
  @action
  toggle = app => {
    if (this.list[this.list.length - 1].key === app.key) {
      return false;
    }
    const remove = _.remove(this.list, v => (v.key === app.key));
    this.list = [... this.list, ... remove];
  };
}
