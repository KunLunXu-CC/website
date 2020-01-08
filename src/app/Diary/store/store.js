import { observable, autorun, toJS } from 'mobx';

import Diary from './diary';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));
  }

  @observable diary = new Diary(this);

  // 自动运行函数列表
  autorun = {
    print: () => {
      console.group('%c[store]Diary', 'color: green;');
      console.log('diary: ', toJS(this.diary));
      console.groupEnd();
    },
  }
}
