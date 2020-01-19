import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';

export default props => (
  <span className={scss.tab}>
    {props.data.name}&nbsp;&nbsp;
    <Icon
      type="icon-guanbi6"
      className={classNames(
        scss['tab-icon'],
        // { [scss['tab-icon-change']]: props.data.change }
      )}
      onClick={props.onClose.bind(null, props.data.id)}
    />
  </span>
);
