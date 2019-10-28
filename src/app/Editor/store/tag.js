import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable tags = [];

  // 查询 tag
  @action
  getTags = async () => {
    const res = await api.getTags();
    this.tags = res.list.map(v => ({...v, editor: false }));
  }

  // 创建 tag: 调用 api
  @action
  createTag = async ({ name, parent }) => {
    const { list } = await api.createTags({ 
      search: {},
      body: [{ name, parent }], 
    });
    this.tags = list;
  }

  // 更新 tag
  @action
  updateTag = async ({ id, name }) => {
    const { list } = await api.updateTags({ 
      search: {},
      conds: { id },
      body: { name }, 
    });
    this.tags = list;
  }

  // 更新 tag
  @action
  removeTags = async ({ id }) => {
    const { list } = await api.removeTags({ 
      search: {},
      conds: { id },
    });
    this.tags = list;
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
