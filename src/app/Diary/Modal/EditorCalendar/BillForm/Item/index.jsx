import React from 'react';
import scss from './index.module.scss';

import { Icon } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';
import { DATASETSFROM_CODE } from '@config/consts';
import { Row, Col, InputNumber, Input, Form, Select } from 'antd';

const useStateHook = () => {
  const billTags = useSelector(
    (state) => state.datasetsfrom[DATASETSFROM_CODE.BILL_TAG.VALUE] || [],
  );

  // 下拉框
  const billTagOptions = React.useMemo(() => billTags.map((v) => (
    <Select.Option
      value={v.value}
      key={v.value}>
      {v.name}
    </Select.Option>
  )), [billTags]);

  return { billTagOptions };
};

export default (props) => {
  const state = useStateHook();

  return (
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
              <Input placeholder="账单描述" />
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
                {state.billTagOptions}
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
        <Icon
          type="icon-shanchu"
          className={scss.delete}
        />
      </Col>
    </Row>
  );
};
