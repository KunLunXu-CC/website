import React from 'react';
import scss from './index.module.scss';

import { Chart } from '@antv/g2';
import { STATS_SAPN } from '@config/consts';
import { STATS_BILL_DETAIL } from '../../../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();
  const containerRef = React.useRef(null);
  const { groupWithName } = useSelector(state => state.diary.statsBill);

  // 处理数据
  const data = React.useMemo(() => (groupWithName.reduce((total, ele) => ([
    ... total,
    ... [
      {
        type: '支出',
        yAxis: ele.expend,
        xAxis: `${ele.name}.`,
        diaries: ele.diaries,
      },
      {
        type: '收入',
        yAxis: ele.income,
        xAxis: `${ele.name}.`,
        diaries: ele.diaries,
      },
      // 只有按照 周、月、年进行统计时才显示结余
      [STATS_SAPN.MONTH.VALUE, STATS_SAPN.YEAR.VALUE].includes(props.span) ? {
        type: '结余',
        xAxis: `${ele.name}.`,
        diaries: ele.diaries,
        yAxis: (ele.income - ele.expend).toFixed(2),
      } : null,
    ],
  ]), [])), [groupWithName]);

  // 实例化Chart
  const chart = React.useMemo(() => {
    if (containerRef.current) {
      return new Chart({
        autoFit: true,
        padding: [60, 50, 65, 50],
        container: containerRef.current,
      });
    }
  }, [containerRef.current]);

  // 渲染图表
  const renderEchart = () => {
    if (chart) {
      // 绑定事件
      chart.on('element:click', ({ data: { data } }) => dispatch({
        diaries: data.diaries,
        type: 'modal/openModal',
        code: STATS_BILL_DETAIL,
      }));

      // 载入数据
      chart.data(data.filter(v => v));

      // 批量设置 scale 配置: 未数据字段(yAxis)进行 scale 配置
      chart.scale('yAxis', {
        nice: true,
      });

      // x 坐标设置
      chart.axis('xAxis', {
        label: {
          formatter: label => label.slice(0, -1),
        },
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
        .color('type', ['#ff7f0e', '#1890ff', '#2ca02c'])
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);

      chart.interaction('active-region');
      chart.render();
    }
  };

  React.useEffect(() => {
    renderEchart();
  }, [containerRef.current, data]);

  return { containerRef };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div
      className={scss.echart}
      ref={state.containerRef}
    />
  );
};
