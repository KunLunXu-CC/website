import * as api from '@api';
import { PHOTO_TYPE } from '@config/consts';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.getBgList();
  }

  @observable bgList = [];

  @action
  getBgList = async () => {
    const search = { type: PHOTO_TYPE.DESKTOP.VALUE };
    const { list } = await api.getPhotos({ search });
    this.bgList = list;
  }
}
