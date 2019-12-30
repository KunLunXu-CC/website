import React from 'react';
import { Icon } from 'qyrc';
import classNames from 'classnames';
import scss from './index.module.scss';

export default props => (
  <span className={scss.tab}>
    {props.data.article.name}&nbsp;&nbsp;
    <Icon
      type="icon-guanbi6"
      className={classNames(
        scss['tab-icon'],
        { [scss['tab-icon-change']]: props.data.change }
      )}
      onClick={props.onClose.bind(null, props.data.article.id)}
    />
  </span>
);
