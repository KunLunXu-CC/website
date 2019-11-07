import _ from 'lodash';
import { observable, action, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import { uploadPhotos } from '@api';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  /***** 显示表单 *****/
  @observable show = false;

  @action
  close = () => (this.show = false);

  @action
  open = () => (this.show = true);

  /***** 上传文件列表 *****/
  @observable fileList = [];

  @action
  addFiles = files => {
    if (!files) {
      return false;
    }
    this.fileList = [... this.fileList, ... files];
  }

  @action
  removeFile = file => {
    this.fileList = file
      ? this.fileList.filter(v => (!_.isEqual(v, file)))
      : [];
  }

  /***** 类型选择 *****/
  @observable type = PHOTO_TYPE.UNKNOWN.VALUE;

  @action
  setType = value => {
    this.type = value ? value : PHOTO_TYPE.UNKNOWN.VALUE;
  }

  /***** 文件上传 *****/
  @action
  upload = () => {
    uploadPhotos({
      body: { files: toJS(this.fileList) }
    });
  }
};
