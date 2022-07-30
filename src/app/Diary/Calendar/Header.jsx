import moment from 'moment';
import scss from './header.module.scss';

import { Input } from 'antd';
import { actions } from '@store';
import { Icon } from '@kunlunxu/brick';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useGetDiariesQuery } from '@store/graphql';

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

export default (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value.format('YYYY-MM'));

  const { data } = useGetDiariesQuery({
    search: { names: getFullDate(value) },
  });

  console.log('%c [ data ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', data);

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
    dispatch(actions.diary.updateDiaries(data?.diaries.list ?? []));
  }, [data, dispatch]);

  return (
    <div className={scss.header}>
      <div
        onClick={onChange.bind(null, -1)}
        className={`${scss.arrow} ${scss['arrow-left']}`}>
        <Icon type="icon-jiantou" />
      </div>
      <div className={scss['input-fied']}>
        <Input
          value={value}
          onPressEnter={onChange}
          onChange={onChangeValue}
        />
      </div>
      <div
        onClick={onChange.bind(null, 1)}
        className={`${scss.arrow} ${scss['arrow-right']}`}>
        <Icon type="icon-jiantou" />
      </div>
    </div>
  );
};
