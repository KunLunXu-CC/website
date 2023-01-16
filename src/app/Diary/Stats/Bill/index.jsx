import dayjs from 'dayjs';
import Echarts from './Echarts';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { STATS_SPAN } from '../../consts';
import { useState, useEffect, useMemo } from 'react';
import { useGetStatsBillQuery } from '@store/graphql';

// span 和 name 映射表
const SPAN_MAP_NAME = {
  [STATS_SPAN.MONTH.VALUE]: [
    dayjs()
      .startOf('month')
      .subtract(12, 'months')
      .format('YYYY-MM-DD'),
    dayjs()
      .endOf('month')
      .format('YYYY-MM-DD'),
  ],
  [STATS_SPAN.YEAR.VALUE]: [
    dayjs()
      .subtract(10, 'years')
      .startOf('years')
      .format('YYYY-MM-DD'),
    dayjs()
      .endOf('years')
      .format('YYYY-MM-DD'),
  ],
};

export default () => {
  const { data } = useGetStatsBillQuery();

  const [span, setSpan] = useState(STATS_SPAN.MONTH.VALUE);
  const dispatch = useDispatch();

  // 总览
  const overview = useMemo(() => [
    { label: '总收入', value: data?.statsBill.stats.income },
    { label: '总支出', value: data?.statsBill.stats.expend },
    { label: '总盈余', value: data?.statsBill.stats.income - data?.statsBill.stats.expend },
  ], [data?.statsBill]);

  // 切换
  const onToggleSpan = (span) => {
    setSpan(span);
  };

  // 获取按钮 classNam
  const getBtnClassName = (value) => classNames(
    scss['header-btn'],
    { [scss['header-btn-action']]: span === value },
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

  return (
    <Card
      bordered={false}
      title="历史收入 / 支出"
      className={scss.card}
      extra={(
        <div className={scss['header-btn']}>
          {Object.values(STATS_SPAN).map((v) => (
            <div
              key={v.VALUE}
              className={getBtnClassName(v.VALUE)}
              onClick={onToggleSpan.bind(null, v.VALUE)}>
              {v.DESC}
            </div>
          ))}
        </div>
      )}>
      {/* 总览 */}
      <div className={scss.overview}>
        {overview.map((v) => (
          <div
            key={v.label}
            className={scss['overview-item']}>
            <div className={scss['overview-label']}>
              {v.label}
            </div>
            <div className={scss['overview-value']}>
              ¥
              {(v.value || 0).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <Echarts span={span} />
    </Card>
  );
};
