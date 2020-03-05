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
  const { groupWithName } = useSelector(state => state.diary.statsBill);

  // 处理数据
  const data = useMemo(() => (groupWithName.reduce((total, ele) => ([
    ... total,
    ... [{
      xAxis: ele.name,
      yAxis: ele.expend,
      name: '支出',
    }, {
      xAxis: ele.name,
      yAxis: ele.income,
      name: '收入',
    }],
  ]), [])), [groupWithName]);

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

      // 批量设置 scale 配置: 未数据字段(yAxis)进行 scale 配置
      chart.scale('yAxis', {
        nice: true,
      });

      // 鼠标停放提示
      chart.tooltip({
        shared: true,
        showMarkers: false,
      });

      // 四周图示
      chart.legend({
        offsetY: 20,
        position: 'top-right',
      });

      chart
        .interval()
        .position('xAxis*yAxis')
        .color('name', ['#ff7f0e', '#2ca02c']);

      chart.interaction('active-region');
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
