import React from 'react';
const StoreContext = React.createContext(null);
import { useStore as useGlobalStore } from '@store';
import { observable, action, autorun, toJS } from 'mobx';

import { getTagList } from '@api';

class Store {
  constructor(global){
    this.global = global;
    autorun(this.print);
  }

  @observable tagList = [];

  @action
  getTagList(){
    getTagList().then(data => {
      const { list } = data;
      this.tagList = list;
    });
  };

  print = () => {
    console.group('%c[store]Note', 'color: green;');
    console.log('tagList: ', toJS(this.tagList));
    console.groupEnd();
  }
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
