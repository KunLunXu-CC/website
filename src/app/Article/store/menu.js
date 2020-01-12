import { getTagsWithArticles } from '@api';
import { observable, action, reaction } from 'mobx';
import { TAG_ALL, ARTICLE_STATUS, SPIN_CODE } from '@config/consts';

export default class Store {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable tag = TAG_ALL.id;  // 当前 tag
  @observable list = [];       // tag 列表

  @action
  setTag = value => {
    this.tag = value;
  }

  @action
  getList = async () => {
    const { list } = await getTagsWithArticles({
      spin: SPIN_CODE.APP_ARTICLE,
      search: { status: ARTICLE_STATUS.RELEASE },
    });
    this.list = [TAG_ALL, ... list];
  }
}
