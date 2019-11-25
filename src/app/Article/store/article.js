import _ from 'lodash';
import * as api from '@api';
import { PHOTO_TYPE } from '@config/consts';
import { observable, action, reaction } from 'mobx';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.getThumbs();
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable thumbs = []     // 缩略图

  @action
  getThumbs = async () => {
    const search = { type: [
      PHOTO_TYPE.THUMB.VALUE,
      PHOTO_TYPE.DESKTOP.VALUE,
    ] };
    const { list } = await api.getPhotos({ search });
    this.thumbs = list;
  }

  // reaction 函数列表
  reaction = {
    // setDefaultNote: {
    //   data: () => (
    //     this.noteList.length > 0 ? this.noteList[0] : null
    //   ),
    //   effect: v => (this.note = v),
    // },
  };
}
