import _ from 'lodash';
import { observable, action, autorun, reaction, toJS } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Store {
  constructor(parent){
    this.parent = parent;
  }

  @observable articles = [];

  // 查询 articles
  @action
  getArticles = async () => {
    const res = await api.getArticles();
    this.articles = res.list.map(v => ({...v, editor: false }));
  }

  // 创建 articles
  @action
  createArticle = async ({ name, tags }) => {
    const res = await api.createArticles({ 
      search: {},
      body: [{ name, tags }], 
    });
    this.articles = res.list.map(v => ({...v, editor: false }));
  }

  // 更新 articles
  @action
  updateArticle = async ({ name, id }) => {
    const res = await api.updateArticles({ 
      search: {},
      conds: { id },
      body: { name }, 
    });
    this.articles = res.list.map(v => ({...v, editor: false }));
  }

  // 删除 tag
  @action
  removeArticle = async ({ id }) => {
    const res = await api.removeArticles({ 
      search: {},
      conds: { id },
    });
    this.articles = res.list.map(v => ({...v, editor: false }));
  }

  // 创建虚拟 article (占位符)
  @action
  createFictitiousArticle = (parent) => {
    const { id, name } = parent;
    this.articles = [
      { 
        editor: true,
        name: void 0, 
        id: 'newArticle', 
        tags: [{ id, name }],
      },
      ...this.articles,
    ];
  }

  // 编辑文章: 找到数据设置 editor: true
  @action
  editorArticle = ({ id }) => {
    this.articles = this.articles.map(v => {
      v.id === id && (v.editor = true);
      return v;
    });
  }
};
