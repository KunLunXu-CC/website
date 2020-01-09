import React, {
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useStore } from '../store';
import { useObserver } from 'mobx-react-lite';
import { DIARY_EDIT_FORM } from '../Modal/consts';

const useStateHook = store => {
  useEffect(() => {
    store.diary.getDiaries();
  }, [store.diary]);

  // 编辑
  const onEdit = data => {
    store.global.modal.open({
      data,
      title: '编辑日记',
      code: DIARY_EDIT_FORM,
    });
  };

  return { onEdit };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);

  return useObserver(() => (
    <div className={scss.body}>
      {_.sortBy(store.diary.list, 'name')
        .reverse()
        .map(v => (
          <div
            key={v.id}
            className={scss.item}
            onClick={state.onEdit.bind(null, v)}>
            <Icon
              type="icon-biji"
              className={scss.icon}
            />
            <span>{v.name}</span>
          </div>
        ))
      }
    </div>
  ));
};
