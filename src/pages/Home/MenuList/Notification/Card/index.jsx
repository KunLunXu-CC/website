import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

// 大(345 354)、小(165 163)、中(346, 166)
// size: large | middle | small
export default props => (
  <div className={classNames(scss.card, props.size)}>
    {/* <div className={scss['card-body']}>

    </div> */}
  </div>
);
