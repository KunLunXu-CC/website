import React from 'react';
import scss from './index.module.scss';

import { Popconfirm } from 'antd';
import { Markdown, Icon } from 'qyrc';
import { APP_CODE, BOOLEAN } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

  const { writable } = useSelector(state => {
    const { user: { role: { auth } } } = state;
    const writable = auth.find(v => v.code === APP_CODE.READ) ?. writable;
    return { writable };
  });

  // 删除
  const onDelete = () => {
    dispatch({
      type: 'read/onDelete',
      id: props.data ?. id,
    });
  };

  // 编辑
  const onEditor = () => {
    dispatch({
      type: 'read/setEditor',
      editor: {
        show: true,
        current: props.data,
      },
    });
  };

  return { onDelete, onEditor, writable };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={scss.item}>
      <div className={scss.header}>
        <div className={scss.title}>
          {props.data.content
            ?. match(/^#{1}\s+(?<title>.*)/)
            ?. groups.title
            ?? '---'
          }
        </div>
        {state.writable === BOOLEAN.TRUE ? (
          <div className={scss.tools}>
            <Icon
              type="icon-editor"
              onClick={state.onEditor}
            />
            <Popconfirm
              okText="是"
              cancelText="否"
              title="确认删除该数据?"
              placement="bottomRight"
              onConfirm={state.onDelete}>
              <Icon type="icon-guanbi6" />
            </Popconfirm>
          </div>
        ) : null}
      </div>
      <div className={scss.body}>
        <Markdown>
          {props.data.content ?. replace(/^#{1}\s+(?<title>.*)/, '')}
        </Markdown>
      </div>
    </div>
  );
};
