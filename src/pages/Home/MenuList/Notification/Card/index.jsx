import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

const DEFAULT_SIZE = 'middle'; // 默认尺寸

// size: large | middle | small
export default (props) => (
  <div className={classNames(
    scss.card,
    props.className,
    props.size || DEFAULT_SIZE)}>
    {props.children}
  </div>
);
