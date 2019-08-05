import React from 'react';

import DateZone from './C_DateZone';
import ToolList from './C_ToolList';

import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['dosktop-header']}>
      <DateZone />
      <ToolList />
    </div>
  );
};
