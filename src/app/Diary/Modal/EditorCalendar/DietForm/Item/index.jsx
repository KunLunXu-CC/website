import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Icon } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';
import { DATASETSFROM_CODE } from '@config/consts';
import { Row, Col, Select, Input, Form } from 'antd';

const useStateHook = () => {
  const dietTags = useSelector(
    (state) => state.datasetsfrom[DATASETSFROM_CODE.DIET_TAG.VALUE] || [],
  );

  // 类型下拉项
  const typeOptions = useMemo(() => (
    dietTags.map((v) => (
      <Select.Option
        value={v.value}
        key={v.value}>
        {v.name}
      </Select.Option>
    ))
  ), [dietTags]);

  return { typeOptions };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <Row
      gutter={16}
      className={scss.row}>
      <Col span={8}>
        <Form.Item
          {... props.field}
          label="类型"
          rules={[{
            required: true,
            message: '请选择类型!',
          }]}
          name={[props.field.name, 'type']}
          className={scss['form-item']}
          fieldKey={[props.field.fieldKey, 'type']}>
          <Select
            style={{ width: '100%' }}
            placeholder="类型">
            {state.typeOptions}
          </Select>
        </Form.Item>
      </Col>
      <Col span={14}>
        <Form.Item
          {... props.field}
          label="描述"
          rules={[{
            required: true,
            message: '请填写描述!',
          }]}
          name={[props.field.name, 'desc']}
          className={scss['form-item']}
          fieldKey={[props.field.fieldKey, 'desc']}>
          <Input placeholder="饮食描述" />
        </Form.Item>
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
