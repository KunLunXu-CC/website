import React from 'react';
import List from './List';

import { useStore } from '@store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  const onClick = dock => {
    store.app.open(dock);
  };
  return { onClick };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <List
      onClick={state.onClick}
      dataSource={store.dock.list}
    />
  ));
};
