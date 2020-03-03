import React, {
  useMemo,
  useCallback,
} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import scss from './index.module.scss';

import { DIARY_EDITOR_DIARY } from '../../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = props => {
  const { diaries = [] } = useSelector(state => state.diary);
  const dispatch = useDispatch();

  // 日期
  const date = useMemo(() => (
    moment(props.date).date()
  ), [props.date]);

  // 当天笔记
  const diary = useMemo(() => (
    diaries.find(v => v.name === props.date.format('YYYY-MM-DD'))
  ), [diaries, props.date]);

  // 最外层 className
  const className = useMemo(() => classNames(
    scss.cell,
    { [scss['cell-has-data']]: diary },
  ), [diary]);

  // 点击单元格
  const onClick = useCallback(() => {
    dispatch({
      diary,
      date: props.date,
      type: 'modal/openModal',
      code: DIARY_EDITOR_DIARY,
    });
  }, [props.date, diary]);

  return { date, className, diary, onClick };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div
      onClick={state.onClick}
      className={state.className}>
      <div className={scss.date}>
        {state.date}
      </div>
    </div>
  );
};
