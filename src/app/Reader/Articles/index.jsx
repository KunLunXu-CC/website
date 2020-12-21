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
    dispatch({
      type: '',
    });
  }, [selectedKey]);

  return {};
};

export default () => {
  useStateHook();

  return  (
    <div className={scss.articles}>
      文章列表
    </div>
  );
};
