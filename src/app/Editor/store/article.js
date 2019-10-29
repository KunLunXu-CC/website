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
};
