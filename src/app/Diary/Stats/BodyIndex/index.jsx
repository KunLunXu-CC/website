import React, {
  useEffect,
  useCallback,
} from 'react';
import moment from 'moment';
import Echart from './Echart';
import scss from './index.module.scss';

import { DatePicker } from 'antd';
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
          ? [date[0].formart('YYYY-MM-DD'), date[1].formart('YYYY-MM-DD')]
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
    <div className={scss.card}>
      <div className={scss.header}>
        <div className={scss['header-title']}>
          身体体征曲线图
        </div>
        <div className={scss['header-picker']}>
          <DatePicker.RangePicker
            onChange={state.search}
            defaultValue={DEFAULT_DATE}
          />
        </div>
      </div>
      <Echart/>
    </div>
  );
};
