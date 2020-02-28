import React from 'react';
import moment from 'moment';
import scss from './index.module.scss';

import {
  Col,
  Row,
  Card,
  Form,
  DatePicker,
  InputNumber,
} from 'antd';

export default props => (
  <Card title="基础设置" className={scss.card}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="日期" className={scss['form-item']}>
          {props.form.getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请填写日期',
            }],
            initialValue: _.get(props, 'modal.data.name')
              ? moment(_.get(props, 'modal.data.name'))
              : void 0,
          })(<DatePicker style={{ width: '100%' }}/>)}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="体重 (KG) " className={scss['form-item']}>
          {props.form.getFieldDecorator('bodyIndex.weight', {
            initialValue: _.get(props, 'modal.data.bodyIndex.weight'),
          })(
            <InputNumber
              min={50}
              placeholder="体重"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="起居" className={scss['form-item']}>
          {props.form.getFieldDecorator('getUp', {
            initialValue: _.get(props, 'modal.data.getUp')
              ? moment(_.get(props, 'modal.data.getUp'))
              : void 0,
          })(
            <DatePicker showTime style={{ width: '100%' }}/>
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="体脂 (%) " className={scss['form-item']}>
          {props.form.getFieldDecorator('bodyIndex.bodyfat', {
            initialValue: _.get(props, 'modal.data.bodyIndex.bodyfat'),
          })(
            <InputNumber
              min={8}
              max={100}
              placeholder="体脂"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="歇息" className={scss['form-item']}>
          {props.form.getFieldDecorator('toRest', {
            initialValue: _.get(props, 'modal.data.toRest')
              ? moment(_.get(props, 'modal.data.toRest'))
              : void 0,
          })(
            <DatePicker showTime style={{ width: '100%' }}/>
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="水分 (%) " className={scss['form-item']}>
          {props.form.getFieldDecorator('bodyIndex.moistureContent', {
            initialValue: _.get(props, 'modal.data.bodyIndex.moistureContent'),
          })(
            <InputNumber
              min={10}
              max={100}
              placeholder="水分"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
    </Row>
  </Card>
);
