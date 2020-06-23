import React from 'react';
import scss from './index.module.scss';

import { Popconfirm } from 'antd';
import { Markdown, Icon } from 'qyrc';
import { useDispatch } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

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

  return { onDelete, onEditor };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div className={scss.item}>
      <div className={scss.header}>
        <div className={scss.title}>
          这只是一个标题
        </div>
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
      </div>
      <div className={scss.body}>
        <Markdown>
          {props.data.content}
        </Markdown>
      </div>
    </div>
  );
};
