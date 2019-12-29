import { message } from '@utils';
import { observable, action, toJS } from 'mobx';
import { PHOTO_TYPE, SPIN_CODE, MESSAGE_CODE } from '@config/consts';
import * as api from '@api';

export default class Upload {
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

  // 清除待上传图片
  @action
  clearFiles = () => {
    this.fileList = [];
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
    // 非空校验
    if (this.fileList.length === 0) {
      message({
        type: 'error',
        code: MESSAGE_CODE.APP_ALBUM,
        message: '上传文件列表不能为空!',
      });
      return false;
    }

    // 上传文件
    const res = await api.uploadPhotos({
      type: this.type,
      spin: SPIN_CODE.APP_ALBUM,
      files: toJS(this.fileList),
    });
    message({
      type: 'error',
      message: '文件上传成功!',
      code: MESSAGE_CODE.APP_ALBUM,
    });
    this.show = false;
    this.clearFiles();
    return res;
  }
}
