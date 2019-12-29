import { observable, autorun, toJS } from 'mobx';

import Tag from './tag';
import Menu from './menu';
import Article from './article';
import Spin from '@store/common/spin';
import Message from '@store/common/message';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable tag = new Tag(this);
  @observable menu = new Menu(this);
  @observable spin = new Spin(this);
  @observable article = new Article(this);
  @observable message = new Message(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]Editor', 'color: green;');
      console.log('article: ', toJS(this.article));
      console.log('menu: ', toJS(this.menu));
      console.log('tag: ', toJS(this.tag));
      console.groupEnd();
    },
  }
}
