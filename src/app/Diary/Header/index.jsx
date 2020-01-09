import React from 'react';
import scss from './index.module.scss';

import { useStore } from '../store';
import { DIARY_EDIT_FORM } from '../Modal/consts';
import { Icon } from 'qyrc';

const useStateHook = store => {
  const onAdd = () => {
    store.global.modal.open({
      title: '新增日记',
      code: DIARY_EDIT_FORM,
    });
  };
  return { onAdd };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);

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
