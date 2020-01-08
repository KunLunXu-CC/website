import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import {
  Col,
  Row,
  Form,
  Input,
  Select,
} from 'antd';
import { DIET_TYPE } from '@config/consts';

const useStateHook = () => {
  // 类型下拉项
  const typeOptions = useMemo(() => (
    Object.values(DIET_TYPE).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  return { typeOptions };
};

export default props => {
  const state = useStateHook();

  return (
    <Row gutter={16} className={scss.row}>
      <Col span={8}>
        <Form.Item label="类型" className={scss['form-item']}>
          {props.form.getFieldDecorator(`diet[${props.index}].type`, {
            rules: [{
              required: true,
              message: '请选择类型!',
            }],
          })(
            <Select style={{ width: '100%' }} placeholder="类型">
              {state.typeOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item label="描述" className={scss['form-item']}>
          {props.form.getFieldDecorator(`diet[${props.index}].desc`, {
            rules: [{
              required: true,
              message: '请填写描述!',
            }],
          })(
            <Input placeholder="饮食描述"/>
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};
