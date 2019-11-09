import _ from 'lodash';
import { observable, action, computed } from 'mobx';
import { PHOTO_TYPE } from '@config/consts';
import * as api from '@api';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @observable articles = [];

  @observable openList = []; // 开启列表: { article： id, change }

  // 获取工作窗口数据
  @computed get works () {
    return this.openList.map( v => ({
      ... v,
      article: this.articles.find(article => article.id === v.article),
    }));
  }

  /***** 处理菜单 *****/

  // 切换状态(change)
  @action
  toggleStatusWithChange = (id, content) => {
    const item = this.openList.find(v => v.article === id);
    const article = this.articles.find(v => v.id === id);
    const change = article.content !== content;
    if (item && item.change !== change) {
      this.openList = this.openList.map(v => ({
        ... v,
        change: v.article === id ? change : v.change,
      }));
    }
  }

  // 打开: 文章
  @action
  open = article => {
    // 过滤: 如果已存在
    if (!this.openList.find(v => v.article === article)) {
      this.openList = [... this.openList, {
        article,
        change: false,
      }];
    }
  }

  // 关闭: 文章
  @action
  close = article => {
    this.openList = this.openList.filter(v => v.article !== article);
  }

  /***** 处理文章 *****/

  // 查询 articles
  @action
  getArticles = async () => {
    const res = await api.getArticles();
    this.articles = res.list.map(v => ({ ... v, editor: false }));
  }

  // 创建 articles
  @action
  createArticle = async ({ name, tags }) => {
    const res = await api.createArticles({
      search: {},
      body: [{ name, tags }],
    });
    this.articles = res.list.map(v => ({ ... v, editor: false }));
  }

  // 更新 articles
  @action
  updateArticle = async ({ body, id }) => {
    const res = await api.updateArticles({
      body,
      search: {},
      conds: { id },
    });
    this.articles = res.list.map(v => ({ ... v, editor: false }));
  }

  // 删除 文章
  @action
  removeArticle = async ({ id }) => {
    const res = await api.removeArticles({
      search: {},
      conds: { id },
    });
    this.articles = res.list.map(v => ({ ... v, editor: false }));
  }

  // 创建虚拟 article (占位符)
  @action
  createFictitiousArticle = parent => {
    const { id, name } = parent;
    this.articles = [
      {
        editor: true,
        name: void 0,
        id: 'newArticle',
        tags: [{ id, name }],
      },
      ... this.articles,
    ];
  }

  // 编辑文章: 找到数据设置 editor: true
  @action
  editorArticle = ({ id }) => {
    this.articles = this.articles.map(v => ({
      ... v,
      editor: v.id === id,
    }));
  }

  // 上传图片
  uploadPhone = async ({ file, article }) => {
    const res = await api.uploadPhotos({
      files: [file],
      payload: article,
      type: PHOTO_TYPE.ARTICLE.VALUE,
    });
    return _.get(res, '[0].url', '');
  }
};
