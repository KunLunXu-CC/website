import React from 'react';
import Form from './Form';
import scss from './index.module.scss';

import {
  Card,
  Empty,
} from 'antd';
import { Icon } from 'qyrc';

const useStateHook = props => {
  // 新增
  const onAdd = () => {
    const keys = props.form.getFieldValue('billKeys');
    const max = Math.max(0, ... keys) + 1;
    props.form.setFieldsValue({ billKeys: [... keys, max] });
  };

  // 删除
  const onDelete = value => {
    const keys = props.form.getFieldValue('billKeys');
    props.form.setFieldsValue({ billKeys: keys.filter(v => v !== value) });
  };

  return { onAdd, onDelete };
};

export default props => {
  const state = useStateHook(props);

  props.form.getFieldDecorator('billKeys', { initialValue: [] });
  return (
    <Card
      title="账单记录"
      className={scss.card}
      extra={<span className={scss.link} onClick={state.onAdd}>新增</span>}
    >
      {props.form.getFieldValue('billKeys').length > 0 ?
        props.form.getFieldValue('billKeys').map(v => (
          <div className={scss.item} key={v}>
            <Form form={props.form} index={v}/>
            <div
              className={scss.delete}
              onClick={state.onDelete.bind(null, v)}>
              <Icon type="icon-shanchu"/>
            </div>
          </div>
        )) :
        <Empty className={scss.empty}/>
      }
    </Card>
  );
};
