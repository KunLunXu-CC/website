import React from 'react';

import { Echart } from 'qyrc';
// import { STATS_SAPN } from '@config/consts';
// import { STATS_BILL_DETAIL } from '../../../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = props => {
  // const dispatch = useDispatch();
  const { groupWithName } = useSelector(state => state.diary.statsBill);

  // 处理数据
  const data = React.useMemo(() => (groupWithName.reduce((total, ele) => ({
    xAxis: [... total.xAxis, ele.name],
    income: [... total.income, ele.income],
    balance: [... total.balance, (ele.income - ele.expend).toFixed(2)],
    expend: [... total.expend, { value: ele.expend, diaries: ele.diaries }],
  }), { xAxis: [], expend: [], income: [], balance: [] })), [groupWithName]);

  // echarts 配置
  const option = React.useMemo(() => ({
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        barGap: 0,
        type: 'bar',
        name: '支出',
        data: data.expend,
      },
      {
        barGap: 0,
        type: 'bar',
        name: '收入',
        data: data.income,
      },
      {
        barGap: 0,
        type: 'bar',
        name: '结余',
        data: data.balance,
      },
    ],
  }), [data]);

  // 绑定事件
  const on = React.useMemo(() => ([{
    eventName: 'click',
    handler: (... args) => {
      console.log(... args);
    },
  }]), []);

  return { option, on };
};

export default props => {
  const state = useStateHook(props);
  return (
    <Echart
      height={300}
      on={state.on}
      option={state.option}
    />
  );
};
