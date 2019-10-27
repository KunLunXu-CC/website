import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';

import Tag from './tag';
import Menu from './menu';

export default class Store {

  constructor(global){
    this.global = global;
    autorun(this.print);
  }

  @observable tag = new Tag(this);
  @observable menu = new Menu(this);

  print = () => {
    console.group('%c[store]Editor', 'color: green;');
    console.log('tag: ', toJS(this.tag));
    console.log('menu: ', toJS(this.menu));
    console.groupEnd();   
  };
};
