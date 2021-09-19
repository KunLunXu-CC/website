import React from 'react';
import Editor from './Editor';
import scss from './index.module.scss';

export default () => (
  <div className={scss.modal}>
    <Editor />
  </div>
);
