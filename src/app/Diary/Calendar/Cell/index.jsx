import React, {
  useMemo,
} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import scss from './index.module.scss';

import { useSelector } from 'react-redux';

const useStateHook = props => {
  const { diaries = [] } = useSelector(state => state.diary);

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

  return { date, className, diary };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={state.className}>
      <div className={scss.date}>
        {state.date}
      </div>
    </div>
  );
};
