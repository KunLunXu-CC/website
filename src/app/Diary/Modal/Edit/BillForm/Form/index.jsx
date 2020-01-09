import _ from 'lodash';
import React from 'react';
import scss from './index.module.scss';

import {
  Col,
  Row,
  Form,
  Input,
  InputNumber,
} from 'antd';

export default props => (
  <Row gutter={16} className={scss.row}>
    <Col span={24}>
      <Form.Item label="描述" className={scss['form-item']}>
        {props.form.getFieldDecorator(`bill[${props.index}].desc`, {
          rules: [{
            required: true,
            message: '请填写描述!',
          }],
          initialValue: _.get(props, `modal.data.bill[${props.index}].desc`),
        })(
          <Input placeholder="账单描述"/>
        )}
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item label="收入" className={scss['form-item']}>
        {props.form.getFieldDecorator(`bill[${props.index}].income`, {
          initialValue: _.get(props, `modal.data.bill[${props.index}].income`),
        })(
          <InputNumber
            min={0}
            placeholder="收入"
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item label="支出" className={scss['form-item']}>
        {props.form.getFieldDecorator(`bill[${props.index}].expend`, {
          initialValue: _.get(props, `modal.data.bill[${props.index}].expend`),
        })(
          <InputNumber
            min={0}
            placeholder="支出"
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item label="结余" className={scss['form-item']}>
        {props.form.getFieldDecorator(`bill[${props.index}].balance`, {
          initialValue: _.get(
            props,
            `modal.data.bill[${props.index}].balance`
          ),
        })(
          <InputNumber
            min={0}
            placeholder="结余"
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
    </Col>
  </Row>
);
