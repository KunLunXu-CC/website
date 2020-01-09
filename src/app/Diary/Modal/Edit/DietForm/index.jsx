import React, {
  useEffect,
} from 'react';
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
    const keys = props.form.getFieldValue('dietKeys');
    const max = Math.max(0, ... keys) + 1;
    props.form.setFieldsValue({ dietKeys: [... keys, max] });
  };

  // 删除
  const onDelete = value => {
    const keys = props.form.getFieldValue('dietKeys');
    props.form.setFieldsValue({ dietKeys: keys.filter(v => v !== value) });
  };

  useEffect(() => {
    const diet = _.get(props.modal, 'data.diet');
    if (diet && props.modal && !useStateHook.setBillKeysed) {
      useStateHook.setBillKeysed = true;
      props.form.setFieldsValue({ dietKeys: Object.keys(diet) });
    }
  }, [props.modal, props.form]);

  return { onAdd, onDelete };
};

export default props => {
  const state = useStateHook(props);

  props.form.getFieldDecorator('dietKeys', { initialValue: [] });
  return (
    <Card
      title="饮食记录"
      className={scss.card}
      extra={<span className={scss.link} onClick={state.onAdd}>新增</span>}
    >
      {props.form.getFieldValue('dietKeys').length > 0 ?
        props.form.getFieldValue('dietKeys').map(v => (
          <div className={scss.item} key={v}>
            <Form modal={props.modal} form={props.form} index={v} />
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
