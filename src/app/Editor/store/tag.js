import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import { getTags } from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable tags = [];

  // 查询 tag
  @action
  getTags = async () => {
    const res = await getTags();
    this.tags = res.list.map(v => ({...v, editor: false }));
  }

  // 创建 tag
  @action
  createTag = ({ value, parent }) => {
    this.tags = this.tags.map(v => ({ ...v,  editor: false }));
    console.log('--->>>>>>> createTag', value, parent);
  }

  // 更新 tag
  @action
  updateTag = ({ id, value }) => {
    this.tags = this.tags.map(v => ({ ...v,  editor: false }));
    console.log('--->>>>>>> updateTag', id, value);
  }

  // 创建文件夹: 创建虚拟 tag
  @action
  createFolder = (parent) => {
    const { id, name } = parent;
    this.tags = [
      { 
        id: 'newTag', 
        editor: true, 
        name: void 0, 
        parent: { id, name },
      },
      ...this.tags,
    ];
  }

  // 编辑文件夹: 找到数据设置 editor: true
  @action
  editorFolder = ({ id }) => {
    this.tags = this.tags.map(v => {
      v.id === id && (v.editor = true);
      return v;
    });
  }
};
