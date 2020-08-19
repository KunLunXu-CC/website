import React from 'react';
import Select from './Select';
import UploadList from './UploadList';
import scss from './index.module.scss';

export default () => (
  <div className={scss.form}>
    <Select />
    <UploadList />
  </div>
);
