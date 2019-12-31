import React from 'react';
import Select from './Select';
import UploadList from './UploadList';
import scss from './index.module.scss';

import { Scroll } from 'qyrc';

export default () => (
  <Scroll className={scss.form}>
    <Select />
    <UploadList />
  </Scroll>
);
