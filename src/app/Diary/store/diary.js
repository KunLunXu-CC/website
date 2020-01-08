// import * as api from '@api';
import { observable } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @observable list = [];
}
