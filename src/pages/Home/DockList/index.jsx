import React from 'react';
import List from './List';

import { useSelector } from 'react-redux';

const useStateHook = () => {
  const app = useSelector(state => state.app);

  const onClick = dock => {
    // store.app.open(dock);
  };
  return { onClick, app };
};

export default props => {
  const state = useStateHook(props);

  return (
    <List
      onClick={state.onClick}
      dataSource={state.app.docks}
    />
  );
};
