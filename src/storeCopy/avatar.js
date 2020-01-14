import * as api from '@api';
import { PHOTO_TYPE } from '@config/consts';
import { observable, action } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.getList();
  }

  @observable list = [];

  @action
  getList = async () => {
    const search = { type: [PHOTO_TYPE.AVATAR.VALUE] };
    const { list } = await api.getPhotos({ search });
    this.list = list;
  }
}
