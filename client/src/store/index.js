import React from 'react';
import { observable, action, autorun, toJS } from 'mobx';
const StoreContext = React.createContext(null);
import App from './app';

class Store {
  @observable app = new App();
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

export default (props) => {
  const store = new Store();
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
