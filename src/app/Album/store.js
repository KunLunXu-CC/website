import _ from 'lodash';
import React from 'react';
const StoreContext = React.createContext(null);
import { useStore as useGlobalStore } from '@store';
import { observable, action, autorun, reaction, toJS } from 'mobx';

import { } from '@api';

class Store {
  constructor(global){
    this.global = global;
    _.forIn(this.autorun, v => autorun(v));
    _.forIn(this.reaction, v => reaction(v.data, v.effect));
  }

  @observable showUpload = false;

  @action
  toggleShowUpload = () => {
    this.showUpload = !this.showUpload;
  }

  // 自动运行函数列表
  autorun = {
    print: () => {
      console.group('%c[store]Album', 'color: green;');
      // console.log('tagList: ', toJS(this.tagList));
      console.groupEnd();
    },
  };

  // reaction 函数列表
  reaction = {};
};

// 导出 hook 使用 hook 方法
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

// 导出 context.Provider
export default (props) => {
  const globalStore = useGlobalStore();
  const store = new Store(globalStore);
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
