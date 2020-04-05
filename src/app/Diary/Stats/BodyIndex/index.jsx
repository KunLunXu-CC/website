import React, {
  useEffect,
  useCallback,
} from 'react';
import moment from 'moment';
import Echart from './Echart';
import scss from './index.module.scss';

import { DatePicker, Card } from 'antd';
import { useDispatch } from 'react-redux';

// 默认日期
const DEFAULT_DATE = [
  moment().subtract(365, 'days'),
  moment(),
];

const useStateHook = () => {
  const dispatch = useDispatch();

  // 查询
  const search = useCallback(date => {
    dispatch({
      type: 'diary/getStatsBodyIndex',
      search: {
        names: date && date[0]
          ? [date[0].format('YYYY-MM-DD'), date[1].format('YYYY-MM-DD')]
          : void 0,
      },
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
      extra={
        <DatePicker.RangePicker
          onChange={state.search}
          defaultValue={DEFAULT_DATE}
        />
      }>
      <Echart/>
    </Card>
  );
};
