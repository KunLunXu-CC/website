import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import { getTags } from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable tags = [];

  @action
  getTags = async () => {
    const res = await getTags();
    this.tags = _.get(res, 'list') || [];
  }
};
