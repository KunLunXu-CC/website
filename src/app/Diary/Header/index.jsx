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
      <Icon
        type="icon-xinzeng"
        onClick={state.onAdd}
        className={scss['icon-add']}
      />
    </div>
  );
};
