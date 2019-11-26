import _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';

import Menu from './menu';
import Article from './article';
import Spin from '@store/common/spin';
import Message from '@store/common/message';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));
  }

  @observable spin = new Spin(this);
  @observable menu = new Menu(this);
  @observable article = new Article(this);
  @observable message = new Message(this);

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
