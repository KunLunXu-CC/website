import React from 'react';
import moment from 'moment';
import scss from './index.module.scss';

export default props => (
  <div className={scss.cell}>
    <div>{moment(props.date).date()}</div>
  </div>
);
