import { useCallback } from 'react';
import { actions } from '@store';

import List from './List';

import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const onClick = useCallback((dock) => {
    dispatch(actions.app.open(dock));
  }, [dispatch]);

  return { onClick, app };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <List
      onClick={state.onClick}
      dataSource={state.app.docks}
    />
  );
};
