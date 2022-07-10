import React from 'react';
import scss from './index.module.scss';

import { Icon } from '@kunlunxu/brick';
import { Popconfirm } from 'antd';

export default (props) => (
  <div className={scss.item}>
    <div className={scss.top}>
      <div className={scss.title}>
        {props.data?.name ?? '--'}
      </div>
      <div className={scss.desc}>
        {props.data?.desc ?? '---'}
      </div>
    </div>
    <div className={scss.bottom}>
      <div className={scss.value}>
        {props.data?.value ?? '---'}
      </div>
      <div className={scss.tools}>
        <Icon
          type="icon-baocun"
          onClick={props.onEdit}
          className={scss['icon-edit']}
        />
        <Popconfirm
          okText="是"
          cancelText="否"
          title="确实删除该字典？"
          onConfirm={props.onDelete}>
          <Icon
            type="icon-shanchu"
            className={scss['icon-delete']}
          />
        </Popconfirm>
      </div>
    </div>
  </div>
);
