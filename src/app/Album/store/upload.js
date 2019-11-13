import _ from 'lodash';
import { observable, action, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  /** *** 显示表单 *****/
  @observable show = false;
  @observable fileList = [];
  @observable type = PHOTO_TYPE.UNKNOWN.VALUE;

  // 关闭 - 抽屉
  @action
  close = () => (this.show = false);

  // 打开 - 抽屉
  @action
  open = () => (this.show = true);

  // 添加图片
  @action
  addFiles = files => {
    if (!files) {
      return false;
    }
    this.fileList = [... this.fileList, ... files];
  }

  // 移除图片
  @action
  removeFile = file => {
    this.fileList = file
      ? this.fileList.filter(v => (!_.isEqual(v, file)))
      : [];
  }

  // 设置上传图片类型
  @action
  setType = value => {
    this.type = value ? value : PHOTO_TYPE.UNKNOWN.VALUE;
  }

  // 上传图片
  @action
  upload = async () => {
    const res = await api.uploadPhotos({
      type: this.type,
      files: toJS(this.fileList),
    });
    return res;
  }
}
