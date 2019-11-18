import _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';

import App from './app';
import User from './user';
import Desktop from './desktop';

export default class Store {
  constructor () {
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable app = new App(this);
  @observable user = new User(this);
  @observable desktop = new Desktop(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]全局', 'color: green;');
      console.log('desktop: ', toJS(this.desktop));
      console.log('user: ', toJS(this.user));
      console.log('app: ', toJS(this.app));
      console.groupEnd();
    },
  }
}
