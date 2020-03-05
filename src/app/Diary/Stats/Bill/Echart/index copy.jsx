import React from 'react';
import scss from './index.module.scss';
import { useSelector } from 'react-redux';

import {
  Chart,
  Geom,
  Axis,
  Legend,
  Tooltip,
} from 'bizcharts';

export default () => {
  const data = useSelector(state => state.diary.statsBill.groupWithName);
  const mergeData = data.reduce((total, ele) => ([
    ... total,
    ... [{
      name: ele.name,
      value: ele.expend,
      type: '支出',
    }, {
      name: ele.name,
      value: ele.income,
      type: '收入',
    }],
  ]), []);

  return (
    <div className={scss.echart}>
      <Chart height={400} data={mergeData} padding={[60, 50, 40, 50]} forceFit>
        <Axis/>
        <Tooltip/>
        <Legend position="top-right" offsetY={-5}/>
        <Geom
          size={2}
          type="line"
          shape="smooth"
          position="name*value"
          color={['type', ['#ff7f0e', '#2ca02c']]}
        />
      </Chart>
    </div>
  );
};
