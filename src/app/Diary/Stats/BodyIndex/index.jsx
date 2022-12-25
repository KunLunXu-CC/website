import dayjs from 'dayjs';
import Echart from './Echart';
import scss from './index.module.scss';

import { DatePicker, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

// 默认日期
const DEFAULT_DATE = [
  dayjs().subtract(365, 'days'),
  dayjs(),
];

// 获取区间内所有时间
const getFullDate = ([start, end]) => {
  const res = [];
  let current = start.clone();

  while (current.isBefore(end)) {
    res.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return res;
};

const useStateHook = () => {
  const dispatch = useDispatch();

  // 查询
  const search = useCallback((date) => {
    dispatch({
      type: 'diary/getStatsBodyIndex',
      search: { names: getFullDate(date ?? DEFAULT_DATE) },
    });
  }, []);

  useEffect(() => {
    search();
  }, []);

  return { search };
};

export default () => {
  const state = useStateHook();

  return (
    <Card
      bordered={false}
      title="身体体征曲线图"
      className={scss.card}
      extra={(
        <DatePicker.RangePicker
          bordered={false}
          onChange={state.search}
          defaultValue={DEFAULT_DATE}
        />
      )}>
      <Echart />
    </Card>
  );
};
