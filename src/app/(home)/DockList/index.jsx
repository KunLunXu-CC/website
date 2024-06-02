import { useCallback } from 'react';
import { actions } from '@/store';

import List from './List';

import { useSelector, useDispatch } from 'react-redux';

const DockList = (props) => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  console.log('%c [ app ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', app);

  const handleClick = useCallback((dock) => {
    dispatch(actions.app.open(dock));
  }, [dispatch]);

  return (
    <List
      onClick={handleClick}
      dataSource={app.docks}
    />
  );
};

export default DockList;
