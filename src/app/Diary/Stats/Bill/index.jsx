import dayjs from 'dayjs';
import Cards from './Cards';
import Echarts from './Echarts';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Card } from 'antd';
import { useDispatch } from 'react-redux';
import { STATS_SPAN } from '../../consts';
import { useState, useEffect } from 'react';

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

const useStateHook = () => {
  const [span, setSpan] = useState(STATS_SPAN.MONTH.VALUE);
  const dispatch = useDispatch();

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

  return { span, onToggleSpan, getBtnClassName };
};

export default () => {
  const state = useStateHook();
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
              className={state.getBtnClassName(v.VALUE)}
              onClick={state.onToggleSpan.bind(null, v.VALUE)}>
              {v.DESC}
            </div>
          ))}
        </div>
      )}>
      <Cards />
      <Echarts span={state.span} />
    </Card>
  );
};
