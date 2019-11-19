import _ from 'lodash';
import { observable, action, reaction } from 'mobx';
import { getTags, getNotes } from '@api';

const BASE_TAG = {
  id: 'all',
  name: '全部',
  icon: 'icon-all',
};

export default class Store {
  constructor (parent) {
    this.parent = parent;
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  // 菜单收缩状态
  @observable collapsed = false;

  // 搜索
  @observable search = { name: '' };

  @observable tag = BASE_TAG.id;
  @observable tagList = [];

  @observable note = null;
  @observable noteList = [];


  @action
  toggleCollapsed= () => {
    this.collapsed = !this.collapsed;
  }

  @action
  setSearch = value => {
    this.search = { ... this.search, ... value };
  }

  @action
  setTag = value => {
    this.tag = value;
  }

  @action
  getTags = () => {
    getTags().then(data => {
      const { list } = data;
      this.tagList = [BASE_TAG, ... list];
    });
  };

  @action
  setNote = id => {
    this.note = this.noteList.find(v => v.id === id);
  }

  // 自动运行函数列表
  autorun = {
    getNotes: () => {
      const params = {
        search: { ... this.search },
      };
      !!this.tag && this.tag !== BASE_TAG.id && (params.search.tags = [this.tag]);
      getNotes(params).then(data => {
        const { list } = data;
        this.noteList = [... list];
      });
    },
  };

  // reaction 函数列表
  reaction = {
    setDefaultNote: {
      data: () => (
        this.noteList.length > 0 ? this.noteList[0] : null
      ),
      effect: v => (this.note = v),
    },
  };
}
