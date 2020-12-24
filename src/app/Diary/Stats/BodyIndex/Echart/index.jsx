import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Echart } from 'qyrc';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const containerRef = useRef(null);
  const statsBodyIndex = useSelector(state => state.diary.statsBodyIndex);

  // 处理数据
  const data = useMemo(() => (statsBodyIndex.filter(v => v.bodyIndex).reduce(
    (total, ele) => ([
      ... total,
      ... [
        {
          type: '体重',
          xAxis: ele.name,
          yAxis: _.get(ele, 'bodyIndex.weight', 0),
        },
        {
          type: '体脂',
          xAxis: ele.name,
          yAxis: _.get(ele, 'bodyIndex.bodyfat', 0),
        },
        {
          type: '水分',
          xAxis: ele.name,
          yAxis: _.get(ele, 'bodyIndex.moistureContent', 0),
        },
      ],
    ]), []
  )), [statsBodyIndex]);

  // echarts 配置
  const option = React.useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },
      ],
    };
  }, []);

  return { option };
};

export default props => {
  const state = useStateHook(props);

  return (
    <Echart option={state.option} height={300}/>
  );
};
