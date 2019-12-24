import * as api from '@api';
import { observable, action, reaction } from 'mobx';
import { PHOTO_TYPE, TAG_ALL, ARTICLE_STATUS } from '@config/consts';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    this.getThumbs();
    this.getList();
    this.getTopList();
    console.log('----------->>> ARTICLE_STATUS', ARTICLE_STATUS);
    _.forIn(this.reactionList, v => reaction(v.data, v.effect));
  }

  @observable list = [];             // 文章列表
  @observable tops = [];             // 热门
  @observable thumbs = [];           // 缩略图
  @observable tocList = [];          // 目录列表
  @observable article = null;        // 缩略图
  @observable searchValue = void 0;  // 搜索词条
  @observable scrollHeight = 0;      // 滚动(卷起)高度

  // 设置 scrollHeight
  @action
  setScrollHeight = scrollHeight => {
    this.scrollHeight = scrollHeight;
  }

  // 设置 tocList
  @action
  setTocList = ({ parseData } = {}) => {
    this.tocList = parseData || [];
  }

  // 阅读
  @action
  read = article => {
    this.article = { ... article };
  }

  // 辍学: 取消阅读
  @action
  drop = () => {
    this.article = null;
    this.setTocList();
  }

  // 搜索
  @action
  search = value => {
    this.searchValue = value;
  }

  // 获取缩略图
  @action
  getThumbs = async () => {
    const search = { type: [
      PHOTO_TYPE.THUMB.VALUE,
      PHOTO_TYPE.DESKTOP.VALUE,
    ] };
    const { list } = await api.getPhotos({ search });
    this.thumbs = list;
  }

  // 获取列表
  @action
  getList = async (search = this.getSearch()) => {
    const { list } = await this.parent.spin.runTask(async () => (
      await api.getArticles({ search })
    ));
    this.list = list;
  }

  // 获取 TOP 列表
  @action
  getTopList = async () => {
    const { list } = await this.parent.spin.runTask(async () => (
      await api.getArticles({
        orderBy: { viewCount: -1 },
        pagination: { curent: 1, pageSize: 10 },
      })
    ));
    this.tops = list;
  }

  // 获取列表
  @action
  getList = async (search = this.getSearch()) => {
    const { list } = await this.parent.spin.runTask(async () => (
      await api.getArticles({ search })
    ));
    this.list = list;
  }

  // 获取查询条件
  getSearch = () => {
    const search = { name: this.searchValue };
    (this.parent.menu.tag !== TAG_ALL.id) &&
    (search.tags = [this.parent.menu.tag]);
    return search;
  };

  // reaction 函数列表
  reactionList = {
    getList: {
      data: this.getSearch,
      effect: search => (this.getList(search)),
    },
  };
}
