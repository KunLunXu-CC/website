import React from 'react';
import { Icon, Scroll } from 'qyrc';
import UploadList from './UploadList';
import scss from './index.module.scss';

export default (props) => {
  return (
    <Scroll className={scss['form']}>
      <UploadList />
    </Scroll>
  );
}
