import React, {
  useCallback,
} from 'react';
import List from './List';

import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  const onClick = useCallback(dock => {
    dispatch({ type: 'app/openApp', app: dock });
  }, []);

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
