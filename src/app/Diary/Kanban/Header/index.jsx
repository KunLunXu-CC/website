import React from 'react';
import scss from './index.module.scss';

export default (props) => (
  <div
    className={scss.header}
    {... props.provided.dragHandleProps}>
    可拖动部位
  </div>
);
