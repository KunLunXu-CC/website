import React from 'react';
import { VariableBlock } from 'qyrc';
import scss from './index.module.scss';

export default (props) => {
  return (
    <div className={scss['layout']}>
      <div className={scss['layout-tags']}>
        <div className={scss['container']}>{props.tags}</div>
      </div>
      <div className={scss['layout-body']}>
        <div className={scss['container']}>{props.body}</div>
      </div>
      <div className={scss['layout-side']}>
        <div className={scss['container']}>{props.side}</div>
      </div>
    </div>
  );
}
