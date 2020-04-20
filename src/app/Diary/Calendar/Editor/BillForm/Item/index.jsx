import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { BILL_TAG } from '@config/consts';
import { Row, Col, InputNumber, Input, Form, Select } from 'antd';

// 下拉框
const billTagOptions = Object.values(BILL_TAG).map(V => (
  <Select.Option value={V.VALUE} key={V.VALUE}>
    {V.DESC}
  </Select.Option>
));

export default props => (
  <Row className={scss.row}>
    <Col span={22}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            {... props.field}
            label="描述"
            rules={[{
              required: true,
              message: '请填写描述!',
            }]}
            className={scss['form-item']}
            name={[props.field.name, 'desc']}
            fieldKey={[props.field.fieldKey, 'desc']}>
            <Input placeholder="账单描述"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {... props.field}
            label="标签"
            className={scss['form-item']}
            name={[props.field.name, 'tag']}
            fieldKey={[props.field.fieldKey, 'tag']}>
            <Select
              placeholder="标签"
              style={{ width: '100%' }}>
              {billTagOptions}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {... props.field}
            label="收入"
            className={scss['form-item']}
            name={[props.field.name, 'income']}
            fieldKey={[props.field.fieldKey, 'income']}>
            <InputNumber
              min={0}
              placeholder="收入"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {... props.field}
            label="支出"
            className={scss['form-item']}
            name={[props.field.name, 'expend']}
            fieldKey={[props.field.fieldKey, 'expend']}>
            <InputNumber
              min={0}
              placeholder="支出"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Col>
    <Col
      span={2}
      className={scss['col-delete']}
      onClick={props.remove.bind(null, props.field.name)}>
      <Icon type="icon-shanchu" className={scss.delete}/>
    </Col>
  </Row>
);
