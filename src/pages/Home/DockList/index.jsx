import React from 'react';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '@store';
import { DockList } from '@components';

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
    <DockList
      onClick={state.onClick}
      dataSource={store.dock.list}
    />
  ));
};
