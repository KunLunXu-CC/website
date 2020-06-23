import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Scroll } from 'qyrc';
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
      <Scroll className={scss.body}>
        {state.data.map(v => (
          <Item data={v} key={v.id}/>
        ))}
      </Scroll>
    </div>
  );
};
