import { observable, action, computed } from 'mobx';
import { PHOTO_TYPE, SPIN_CODE, MESSAGE_CODE } from '@config/consts';
import { message } from '@utils';
import * as api from '@api';

export default class Store {
  constructor (parent) {
    this.parent = parent;
  }

  @observable articles = [];

  @observable openList = []; // 开启列表: { article： id, change }

  // 获取工作窗口数据: 所有文章
  @computed get works () {
    return this.openList.map(v => ({
      ... v,
      article: this.articles.find(article => article.id === v.article),
    }));
  }

  // 当前活动窗口(当前窗口打开的文章)
  @computed get action () {
    return this.works.find(
      v => v.article.id === this.parent.menu.selected
    );
  }

  /** *** 处理菜单 *****/

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

  /** *** 处理文章 *****/

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

  // 发布 文章
  @action
  releaseArticle = async ({ id }) => {
    const res = await api.releaseArticle({
      search: {},
      conds: { id },
    });
    this.articles = res.list.map(v => ({ ... v, editor: false }));
  }

  // 撤销(下架) 文章
  @action
  revokeArticle = async ({ id }) => {
    const res = await api.revokeArticle({
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
        name: '',
        editor: true,
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
      spin: SPIN_CODE.APP_EDITOR,
    });
    return _.get(res, '[0].url', '');
  }

  // 上传缩略图
  uploadThumb = async ({ file, article }) => {
    const thumb =  await this.uploadPhone({ file, article });
    await this.updateArticle({ body: { thumb }, id: article });
    message({
      message: '缩略图设置成功!',
      placement: 'bottomRight',
      code: MESSAGE_CODE.APP_EDITOR,
    });
  }
}
