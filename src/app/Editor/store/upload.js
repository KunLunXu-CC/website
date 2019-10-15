import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import { uploadPhotos } from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }
};
