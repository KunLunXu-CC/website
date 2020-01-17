import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useDispatch } from 'react-redux';
import { DIARY_EDIT_FORM } from '../Modal/consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  const onAdd = () => dispatch({
    type: 'modal/openModal',
    code: DIARY_EDIT_FORM,
    title: '新增日记',
  });

  return { onAdd };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.header}>
      <div className={scss.create} onClick={state.onAdd}>
        <Icon
          type="icon-xinzeng"
          className={scss['create-icon']}
        />
        创建日记
      </div>
    </div>
  );
};
