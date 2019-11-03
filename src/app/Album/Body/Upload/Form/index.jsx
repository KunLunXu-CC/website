import React from 'react';
import { Scroll } from 'qyrc';
import Select from './Select';
import UploadList from './UploadList';
import scss from './index.module.scss';

export default () => {
  return (
    <Scroll className={scss['form']}>
      <Select />
      <UploadList />
    </Scroll>
  );
}
