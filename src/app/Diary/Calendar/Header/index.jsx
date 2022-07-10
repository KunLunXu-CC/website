import React, {
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import scss from './index.module.scss';

import { Input } from 'antd';
import { Icon } from '@kunlunxu/brick';
import { useDispatch } from 'react-redux';

// 获取区间内所有时间
const getFullDate = (value) => {
  const start = moment(value)
    .startOf('month')
    .subtract(6, 'day');
  const end = moment(value)
    .endOf('month')
    .add(6, 'day');
  const res = [];
  const current = start.clone();

  while (moment(current).isBefore(end)) {
    current.add(1, 'day');
    res.push(current.format('YYYY-MM-DD'));
  }

  return res;
};

const useStateHook = (props) => {
  const [value, setValue] = useState(props.value.format('YYYY-MM'));
  const dispatch = useDispatch();

  // 切换面板: 1 下一个月, -1 上一个月, event 读取输入框值
  const onChange = (value) => {
    if (value === 1) {
      props.onChange(props.value.clone().add(1, 'months'));
    } else if (value === -1) {
      props.onChange(props.value.clone().subtract(1, 'months'));
    } else {
      props.onChange(moment(
        `${value.target.value}-${props.value.format('DD')}`,
      ));
    }
  };

  // 修改 value
  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(props.value.format('YYYY-MM'));
  }, [props.value.format('YYYY-MM')]);

  useEffect(() => {
    dispatch({
      type: 'diary/getDiaries',
      search: { names: getFullDate(value) },
    });
  }, [value]);

  return { onChange, value, onChangeValue };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <div className={scss.header}>
      <div
        onClick={state.onChange.bind(null, -1)}
        className={`${scss.arrow} ${scss['arrow-left']}`}>
        <Icon type="icon-jiantou" />
      </div>
      <div className={scss['input-fied']}>
        <Input
          value={state.value}
          onPressEnter={state.onChange}
          onChange={state.onChangeValue}
        />
      </div>
      <div
        onClick={state.onChange.bind(null, 1)}
        className={`${scss.arrow} ${scss['arrow-right']}`}>
        <Icon type="icon-jiantou" />
      </div>
    </div>
  );
};
