import React from 'react';
import scss from './index.module.scss';

import { Calendar } from 'antd';

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export default () => (
  <Calendar
    className={scss.calendar}
    onPanelChange={onPanelChange}
  />
);
