import _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';

import Tag from './tag';
import Menu from './menu';
import Article from './article';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));    
  }

  @observable tag = new Tag(this);
  @observable menu = new Menu(this);
  @observable article = new Article(this);

  // 自动运行列表
  autorun = {
    print: () => {
      console.group('%c[store]Editor', 'color: green;');
      console.log('article: ', toJS(this.article));
      console.log('menu: ', toJS(this.menu));
      console.log('tag: ', toJS(this.tag));
      console.groupEnd();
    },
  }
}
