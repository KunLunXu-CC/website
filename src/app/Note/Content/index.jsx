import React from 'react';

import EditBox from './EditBox';
import DisplayBox from './DisplayBox';

import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['content']}>
      <DisplayBox></DisplayBox>
      <EditBox></EditBox>
    </div>
  );
};
