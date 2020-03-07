import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Chart } from '@antv/g2';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const containerRef = useRef(null);
  const statsBodyIndex = useSelector(state => state.diary.statsBodyIndex);

  // 处理数据
  const data = useMemo(() => (statsBodyIndex.reduce((total, ele) => ([
    ... total,
    ... [{
      type: '体重',
      xAxis: ele.name,
      yAxis: ele.bodyIndex.weight,
    }, {
      type: '体脂',
      xAxis: ele.name,
      yAxis: ele.bodyIndex.bodyfat,
    }, {
      type: '水分',
      xAxis: ele.name,
      yAxis: ele.bodyIndex.moistureContent,
    }],
  ]), [])), [statsBodyIndex]);

  // 实例化Chart
  const chart = useMemo(() => {
    if (containerRef.current) {
      return new Chart({
        autoFit: true,
        padding: [60, 50, 40, 50],
        container: containerRef.current,
      });
    }
  }, [containerRef.current]);

  // 渲染图表
  const renderEchart = () => {
    if (chart) {
      // 载入数据
      chart.data(data);

      // 鼠标停放提示
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
      });

      // 四周图示
      chart.legend({
        offsetY: 20,
        position: 'top-right',
      });

      chart
        .line()
        .position('xAxis*yAxis')
        .color('type', ['#fadb14', '#13c2c2', '#722ed1'])
        .shape('smooth');

      chart.render();
    }
  };

  useEffect(() => {
    renderEchart();
  }, [containerRef.current, data]);

  return { containerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <div
      className={scss.echart}
      ref={state.containerRef}
    />
  );
};
