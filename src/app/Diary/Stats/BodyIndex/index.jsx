import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import Echart from './Echart';
import classNames from 'classnames';
import scss from './index.module.scss';

import { STATS_SAPN } from '@config/consts';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const [span, setSpan] = useState('day');
  const dispatch = useDispatch();

  // span 和 name 映射表
  const SPAN_MAP_NAME = useMemo(() => ({
    [STATS_SAPN.DAY.VALUE]: [
      moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    ],
    [STATS_SAPN.WEEK.VALUE]: [
      moment()
        .subtract(15, 'weeks')
        .startOf('week')
        .format('YYYY-MM-DD'),
      moment()
        .endOf('week')
        .format('YYYY-MM-DD'),
    ],
    [STATS_SAPN.MONTH.VALUE]: [
      moment()
        .startOf('month')
        .subtract(12, 'months')
        .format('YYYY-MM-DD'),
      moment()
        .endOf('month')
        .format('YYYY-MM-DD'),
    ],
    [STATS_SAPN.YEAR.VALUE]: [
      moment()
        .subtract(10, 'years')
        .startOf('years')
        .format('YYYY-MM-DD'),
      moment()
        .endOf('years')
        .format('YYYY-MM-DD'),
    ],
  }), []);

  // 切换
  const onToggleSpan = span => {
    setSpan(span);
  };

  // 获取按钮 classNam
  const getBtnClassName = value => classNames(
    scss['header-btn'],
    { [scss['header-btn-action']]: span === value }
  );

  // 监听 span 的变化并查询数据
  useEffect(() => {
    dispatch({
      type: 'diary/getStatsBill',
      search: {
        span,
        name: SPAN_MAP_NAME[span],
      },
    });
  }, [span]);

  return { span, onToggleSpan, getBtnClassName };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.card}>
      <div className={scss.header}>
        <div className={scss['header-title']}>
          历史收入 / 支出
        </div>
        <div className={scss['header-btns']}>
          {Object.values(STATS_SAPN).map(v => (
            <div
              key={v.VALUE}
              className={state.getBtnClassName(v.VALUE)}
              onClick={state.onToggleSpan.bind(null, v.VALUE)}>
              {v.DESC}
            </div>
          ))}
        </div>
      </div>
      <Echart/>
    </div>
  );
};
