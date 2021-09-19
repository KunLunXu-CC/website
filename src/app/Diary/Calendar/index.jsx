import React from 'react';
import Cell from './Cell';
import Header from './Header';
import scss from './index.module.scss';

import { Calendar } from 'antd';

export default () => (
  <Calendar
    className={scss.calendar}
    dateFullCellRender={(date) => <Cell date={date} />}
    headerRender={(params) => (<Header {... params} />)}
  />
);
