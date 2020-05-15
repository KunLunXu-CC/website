import React from 'react';
import scss from './index.module.scss';
import { Icon } from 'qyrc';

export default props => (
  <div className={scss.item}>
    <div className={scss.top}>
      <div className={scss.title}>
        {props.data ?. name ?? '--'}
      </div>
      <div className={scss.desc}>
        {props.data ?. desc ?? '---'}
      </div>
    </div>
    <div className={scss.bottom}>
      <div className={scss.value}>
        {props.data ?. value ?? '---'}
      </div>
      <div className={scss.tools}>
        <Icon
          type="icon-baocun"
          onClick={props.onEdit}
          className={scss['icon-edit']}
        />
        <Icon
          type="icon-shanchu"
          onClick={props.onDelete}
          className={scss['icon-delete']}
        />
      </div>
    </div>
  </div>
);
