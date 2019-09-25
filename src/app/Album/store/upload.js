import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { } from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable show = false;

  @action
  close = () => (this.show = false);

  @action
  open = () => (this.show = true);
};
