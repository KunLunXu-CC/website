import React from 'react';
import Store from './store';

const StoreContext = React.createContext(null);

// 导出 hook 使用 hook 方法
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

// 导入 store 可以在任意地方导入控制 store
export const store = new Store();

// 导出 context.Provider
export default props => (
  <StoreContext.Provider value={store}>
    {props.children}
  </StoreContext.Provider>
);
