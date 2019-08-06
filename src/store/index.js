import React from 'react';
import { observable, action, autorun, toJS } from 'mobx';
const StoreContext = React.createContext(null);
import App from './app';

// 组合全局 store
class Store {
  @observable app = new App();
};

// 导出 hook 使用 hook 方法
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

// 导出 context.Provider
export default (props) => {
  const store = new Store();
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
