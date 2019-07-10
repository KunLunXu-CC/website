import { observable, action, autorun, toJS } from 'mobx';
import { matchPath } from 'react-router-dom';
import apps from '@app/index';
import _ from 'lodash';

const maxStyleParams = {
  width: '100%',
  height: '100%',
  translateX: 0,
  translateY: 0,
};

const minStyleParams = {
  width: 0,
  height: 0,
  translateX: '100vw',
  translateY: '100vh',
};

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
    const route = this.list.find(v => (v.url === url));
    if (!!route){
      !!route.min && this.minimize({ route });
    } else {
      const app = apps.find( v => matchPath(url, { path: v.path, exact: v.exact,strict: false}));
      this.list = [...this.list, { url, match, ...app, min: null, max: null }];
    }
  }

  /**
 * 关闭 app
 * @param {String} url 路由
 */
  @action
  close = ({ url }) => {
    this.list = this.list.filter(v => v.url !== url);
  };

  /**
 * 最大化（切换）
 * @param {Object} route 当前操作 app 的 route
 */
  @action
  maximize = ({ route }) => {
    this.list = this.list.map(v => ((
      v.url !== route.url ? v
      : { ...route, max: !route.max ? maxStyleParams : null }
    )));
  };

  /**
   * 最小化（切换）
   * @param {Object} route 当前操作 app 的 route
   */
  @action
  minimize = ({ route }) => {
    this.list = this.list.map(v => ((
      v.url !== route.url ? v
      : { ...route, min: !route.min ? minStyleParams : null }
    )));
  };

  /**
   * 应用切换
   * @param {String} url 应用 url， 应用唯一标识
   */
  @action
  toggle = ({ url }) => {
    if (this.list[this.list.length - 1].url === url){ return false; }
    const remove = _.remove(this.list, v => (v.url === url));
    this.list = [...this.list, ...remove];
  };


  print = () => {
    console.group('%c[store]app', 'color: green;');
    console.log('list: ', toJS(this.list));
    console.groupEnd();
  }
};
