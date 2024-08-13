import ECharts from '@/components/ECharts';
import { useMemo } from 'react';

export default (props) => {
  // 处理数据
  const data = useMemo(
    () => {
      const reduceInit = {
        xAxis: [],
        weight: [],
        bodyfat: [],
        moistureContent: [],
      };

      const filterData = (props.data || []).filter((v) => (
        v.bodyIndex?.bodyfat &&
        v.bodyIndex?.moistureContent &&
        v.bodyIndex?.weight
      ));

      return filterData.reduce((total, { name, bodyIndex }) => ({
        moistureContent: [
          ...total.moistureContent,
          bodyIndex?.moistureContent ?? 0,
        ],
        xAxis: [...total.xAxis, name],
        weight: [...total.weight, bodyIndex?.weight ?? 0],
        bodyfat: [...total.bodyfat, bodyIndex?.bodyfat ?? 0],
      }), reduceInit);
    },
    [props.data],
  );

  // echarts 配置
  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 0,
      right: 0,
      data: ['体重', '体脂', '水分'],
    },
    grid: {
      top: 40,
      left: 60,
      right: 25,
      bottom: 25,
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,

    },
    yAxis: {
      show: true,
      type: 'value',
      min: 'dataMin',
    },
    series: [
      {
        name: '体重',
        type: 'line',
        color: '#f8d613',
        data: data.weight,
      },
      {
        name: '体脂',
        type: 'line',
        color: '#1db7b5',
        data: data.bodyfat,
      },
      {
        name: '水分',
        type: 'line',
        color: '#5e0ac7',
        data: data.moistureContent,
      },
    ],
  }), [data]);


  return (
    <ECharts
      height={300}
      option={option}
    />
  );
};
