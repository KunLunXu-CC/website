import { observable, action, autorun, toJS } from 'mobx';
import { matchPath } from 'react-router-dom';
import apps from '@app/index';
import _ from 'lodash';

export default class Store {
  constructor(){
    autorun(this.print);
  }

  @observable list = [];

  /**
   * 开启 app
   * @param {String} url 路由
   */
  @action
  open = (url) => {
    let match = void 0;
    let app = this.list.find(v => (v.url === url));
    if (!!app){
      this.minimize(app);
    } else {
      app = apps.find( v => (
        match = matchPath(url, { path: v.path, exact: true, strict: false})
      ));
      !!app && (this.list = [...this.list, { ...app, url, match, isMin: false }]);
    }
  }

  /**
 * 关闭 app
 * @param {Object} app 当前应用配置
 */
  @action
  close = (app) => {
    this.list = this.list.filter(v => v.url !== app.url);
  };

  /**
   * 最小化（切换）
   * @param {Object} app 当前应用配置
   */
  @action
  minimize = (app) => {
    this.list = this.list.map(v => ({ ...v, isMin: !v.isMin }));
  };

  /**
   * 应用切换
   * @param {Object} app 当前应用配置
   */
  @action
  toggle = (app) => {
    if (this.list[this.list.length - 1].url === app.url){ return false; }
    const remove = _.remove(this.list, v => (v.url === app.url));
    this.list = [...this.list, ...remove];
  };

  print = () => {
    console.group('%c[store]app', 'color: green;');
    console.log('list: ', toJS(this.list));
    console.groupEnd();
  }
};
