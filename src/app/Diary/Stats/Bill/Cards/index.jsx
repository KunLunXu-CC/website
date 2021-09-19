import React from 'react';
import scss from './index.module.scss';

import { formatNum } from '@utils';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const { stats } = useSelector((state) => state.diary.statsBill);
  return { stats };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.cards}>
      <div className={scss.item}>
        <div className={scss.label}>
          总收入
        </div>
        <div className={scss.value}>
          ¥
          {' '}
          {formatNum(state.stats.income)}
        </div>
      </div>
      <div className={scss.item}>
        <div className={scss.label}>
          总支出
        </div>
        <div className={scss.value}>
          ¥
          {' '}
          {formatNum(state.stats.expend)}
        </div>
      </div>
      <div className={scss.item}>
        <div className={scss.label}>
          总盈余
        </div>
        <div className={scss.value}>
          ¥
          {' '}
          {formatNum(state.stats.income - state.stats.expend)}
        </div>
      </div>
    </div>
  );
};
