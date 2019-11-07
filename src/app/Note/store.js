import _ from 'lodash';
import React from 'react';
const StoreContext = React.createContext(null);
import { useStore as useGlobalStore } from '@store';
import { observable, action, autorun, reaction, toJS } from 'mobx';

import { getTags, getNotes } from '@api';

const BASE_TAG = {
  id: 'all',
  name: '全部',
  icon: 'icon-all',
}

class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable search = { name: '' };

  @observable tag = BASE_TAG.id;
  @observable tagList = [];

  @observable note = null;
  @observable noteList = [];

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
    print: () => {
      console.group('%c[store]Note', 'color: green;');
      console.log('tagList: ', toJS(this.tagList));
      console.log('tag: ', toJS(this.tag));
      console.log('noteList: ', toJS(this.noteList));
      console.log('note: ', toJS(this.note));
      console.groupEnd();
    },
    getNotes: () => {
      const params = {
        search: { ... this.search }
      };
      !!this.tag && this.tag !== BASE_TAG.id && (params.search.tags = [this.tag]);
      getNotes(params).then(data => {
        const { list } = data;
        this.noteList = [... list];
      })
    },
  };

  // reaction 函数列表
  reaction = {
    setDefaultNote: {
      data: () => (this.noteList[0] || null),
      effect: v => (this.note = v),
    },
  };
};

// 导出 hook 使用 hook 方法
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

// 导出 context.Provider
export default props => {
  const globalStore = useGlobalStore();
  const store = new Store(globalStore);
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
