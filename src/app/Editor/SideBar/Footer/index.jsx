import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 添加 tag
  const addTag = () => {
    dispatch({ type: 'editor/createFictitiousTag', parent: null });
  };

  return { addTag };
};

export default () => {
  const state = useStateHook();

  return (
    <div
      onClick={state.addTag}
      className={scss.footer} >
      <Icon type="icon-xinzeng" />
    </div>
  );
};
