import apps from '@app/index';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  /**
   * 当前开启的应用列表
   * 1. 包含 app 基本配置(参考 src/app/index.js)
   * 2. isMin 表示应用是否是最小化
   */
  @observable list = [];

  /**
   * 开启 app
   * @param {Object} app 要打开应用配置
   */
  @action
  open = app => {
    const current = this.list.find(v => (v.key === app.key));
    !!current
      ? this.minimize(current)
      : (this.list = [
        ... this.list,
        { ... apps.find(v => v.key === app.key), isMin: false, isMax: false },
      ]);
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
   * 最大化
   * @param {Object} app 当前应用
   */
  @action
  maximization = app => {
    this.list = this.list.map(v => ({
      ... v,
      isMax: v.key === app.key ? !v.isMax : v.isMax,
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
