import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { } from '@api';

export default class Store {
  constructor(parent){
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
  addFiles = (files) => {
    if (!files){return false;}
    this.fileList = [ ...this.fileList, ...files ];
  }

  @action
  removeFile = (file) => {
    this.fileList = file 
      ? this.fileList.filter(v => (!_.isEqual(v, file))) 
      : [];
  }

};
