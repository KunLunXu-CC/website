import dayjs from 'dayjs';
import scss from './header.module.scss';

import { Input } from 'antd';
import { actions } from '@/store';
import { Icon } from '@kunlunxu/brick';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useGetDiariesQuery } from '@/store/graphql';

// 获取区间内所有时间
const getFullDate = (value) => {
  const res = [];

  let start = dayjs(value)
    .startOf('month')
    .subtract(6, 'day');

  const end = dayjs(value)
    .endOf('month')
    .add(6, 'day');


  while (start.isBefore(end)) {
    start = start.add(1, 'day');
    res.push(start.format('YYYY-MM-DD'));
  }

  return res;
};

const Header =  (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value.format('YYYY-MM'));

  const { data } = useGetDiariesQuery({
    search: { names: getFullDate(value) },
  });

  // 切换面板: 1 下一个月, -1 上一个月, event 读取输入框值
  const onChange = (value) => {
    if (value === 1) {
      props.onChange(props.value.clone().add(1, 'months'));
    } else if (value === -1) {
      props.onChange(props.value.clone().subtract(1, 'months'));
    } else {
      props.onChange(dayjs(
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

  // 读取数据
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

export default Header;
