import React from 'react';
import scss from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { selectedKey } = useSelector(state => ({
    ... state.reader.menu,
  }));

  React.useEffect(() => {
    console.log('---------');
    // dispatch({});
  }, [selectedKey]);

  return {};
};

export default () => {
  const state = useStateHook();

  return  (
    <div className={scss.articles}>
      文章列表
    </div>
  );
};
