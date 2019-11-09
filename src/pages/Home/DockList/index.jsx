import React from 'react';

import { useStore } from '@store/index';
import { DockList } from '@components';
import dockConfig from '@config/dock';

const useStateHook = (props, store) => {
  const onClick = dock => {
    store.app.open(dock.defaultUrl);
  };
  return { onClick };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <DockList
      dataSource={dockConfig}
      onClick={state.onClick}
    />
  );
};
