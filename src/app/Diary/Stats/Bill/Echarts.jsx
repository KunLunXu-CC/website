import { useMemo } from 'react';
import { Echarts } from '@kunlunxu/brick';
import { useDispatch } from 'react-redux';
import { STATS_BILL_DETAIL } from '../../consts';

export default (props) => {
  const dispatch = useDispatch();

  // 处理数据
  const data = useMemo(() => ((props.data || []).reduce((total, ele) => ({
    xAxis: [...total.xAxis, ele.name],
    income: [...total.income, ele.income],
    balance: [...total.balance, (ele.income - ele.expend).toFixed(2)],
    expend: [...total.expend, { value: ele.expend, diaries: ele.diaries }],
  }), { xAxis: [], expend: [], income: [], balance: [] })), [props.data]);

  // echarts 配置
  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 12,
      right: 0,
      data: ['收入', '支出', '结余'],
    },
    grid: {
      top: 50,
      left: 60,
      right: 25,
      bottom: 25,
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
        color: '#fc6a11',
      },
      {
        barGap: 0,
        type: 'bar',
        name: '收入',
        color: '#197afe',
        data: data.income,
      },
      {
        barGap: 0,
        type: 'bar',
        name: '结余',
        color: '#289322',
        data: data.balance,
      },
    ],
  }), [data]);

  // 绑定事件
  const on = useMemo(() => ([{
    eventName: 'click',
    handler: (echarts, { data: { diaries } }) => {
      if (!diaries) {
        return false;
      }

      echarts.dispatchAction({ type: 'hideTip' });

      dispatch({
        diaries,
        type: 'modal/openModal',
        code: STATS_BILL_DETAIL,
      });
    },
  }]), [dispatch]);


  return (
    <Echarts
      on={on}
      height={300}
      option={option}
    />
  );
};
