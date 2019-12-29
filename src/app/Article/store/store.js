import { observable, autorun, toJS } from 'mobx';

import Menu from './menu';
import Article from './article';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));
  }

  @observable menu = new Menu(this);
  @observable article = new Article(this);

  // 自动运行函数列表
  autorun = {
    print: () => {
      console.group('%c[store]Artile', 'color: green;');
      console.log('article: ', toJS(this.article));
      console.log('menu: ', toJS(this.menu));
      console.groupEnd();
    },
  }
}
