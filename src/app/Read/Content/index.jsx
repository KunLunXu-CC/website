import React from 'react';
import scss from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const {
    listData,
    firstActiveKey,
    secondActiveKey,
  } = useSelector(state => ({
    listData: state.read.listData,
    firstActiveKey: state.read.menu.firstActiveKey,
    secondActiveKey: state.read.menu.secondActiveKey,
  }));

  const data = React.useMemo(() => (
    listData[firstActiveKey] || []
  ), [firstActiveKey, listData]);

  React.useEffect(() => {
    dispatch({ type: 'read/getListData' });
  }, [secondActiveKey, firstActiveKey]);

  return { data };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.content}>
      {state.data.map(v => (
        <div key={v.id} className={scss.item}>
          {v.content}
        </div>
      ))}
    </div>
  );
};
