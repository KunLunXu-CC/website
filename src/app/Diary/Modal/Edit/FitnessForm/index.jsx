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
    const keys = props.form.getFieldValue('fitnessKeys');
    const max = Math.max(0, ... keys) + 1;
    props.form.setFieldsValue({ fitnessKeys: [... keys, max] });
  };

  // 删除
  const onDelete = value => {
    const keys = props.form.getFieldValue('fitnessKeys');
    props.form.setFieldsValue({ fitnessKeys: keys.filter(v => v !== value) });
  };

  return { onAdd, onDelete };
};

export default props => {
  const state = useStateHook(props);

  props.form.getFieldDecorator('fitnessKeys', { initialValue: [] });
  return (
    <Card
      title="训练记录"
      className={scss.card}
      extra={<span className={scss.link} onClick={state.onAdd}>新增</span>}>
      {props.form.getFieldValue('fitnessKeys').length > 0 ?
        props.form.getFieldValue('fitnessKeys').map(v => (
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
