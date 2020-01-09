import React, {
  useMemo,
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Empty } from 'antd';
import { useStore } from '../store';
import { useObserver } from 'mobx-react-lite';
import { DIARY_EDIT_FORM } from '../Modal/consts';

const useStateHook = store => {
  // 编辑
  const onEdit = data => {
    store.global.modal.open({
      data,
      title: '编辑日记',
      code: DIARY_EDIT_FORM,
    });
  };

  // 计算日记列表
  const diaries = useMemo(() => (
    _.sortBy(store.diary.list, 'name').reverse()
  ), [store.diary.list]);

  useEffect(() => {
    store.diary.getDiaries();
  }, [store.diary]);

  return { onEdit, diaries };
};

export default () => {
  const store = useStore();

  return useObserver(() => {
    const state = useStateHook(store);
    return (
      <div className={scss.body}>
        {state.diaries.length > 0 ?
          state.diaries.map(v => (
            <div
              key={v.id}
              className={scss.item}
              onClick={state.onEdit.bind(null, v)}>
              <Icon
                type="icon-biji"
                className={scss.icon}
              />
              <span className={scss.title}>{v.name}</span>
            </div>
          )) :
          <Empty className={scss.empty}/>
        }
      </div>
    );
  });
};
