import React, {
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Empty } from 'antd';
import { DIARY_EDIT_FORM } from '../Modal/consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const diaries = useSelector(
    state => _.sortBy(
      _.get(state, 'diary.diaries') || [],
      'name'
    ).reverse()
  );

  // 编辑
  const onEdit = data => {
    dispatch({
      data,
      type: 'modal/openModal',
      code: DIARY_EDIT_FORM,
      title: '编辑日记',
    });
  };

  useEffect(() => {
    dispatch({ type: 'diary/getDiaries' });
  }, []);

  return { onEdit, diaries };
};

export default () => {
  const state = useStateHook();

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
};
