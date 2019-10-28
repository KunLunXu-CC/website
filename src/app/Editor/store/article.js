import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable aticles = [];

  // 查询 aticles
  @action
  getAticles = async () => {
    const { list } = await api.getAticles();
    this.aticles = list;
  }
};
