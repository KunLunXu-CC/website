import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import {
  Col,
  Row,
  Form,
  Select,
} from 'antd';
import { Icon } from 'qyrc';
import { useSelector } from 'react-redux';
import { DATASETSFROM_CODE } from '@config/consts';

const useStateHook = (props) => {
  const { fitnessTypes, fitnessPlaces } = useSelector((state) => ({
    fitnessTypes: state.datasetsfrom[DATASETSFROM_CODE.FITNESS_TYPE.VALUE],
    fitnessPlaces: state.datasetsfrom[DATASETSFROM_CODE.FITNESS_PLACE.VALUE],
  }));

  // 类型下拉项
  const typeOptions = useMemo(() => (
    (fitnessTypes || []).map((v) => (
      <Select.Option
        value={v.value}
        key={v.value}>
        {v.name}
      </Select.Option>
    ))
  ), [fitnessTypes]);

  // 训练部位下拉项
  const placeOptions = useMemo(() => (
    (fitnessPlaces || []).map((v) => (
      <Select.Option
        value={v.value}
        key={v.value}>
        {v.name}
      </Select.Option>
    ))
  ), [fitnessPlaces]);

  // type 修改
  const onTypeChange = () => {
    const fitness = props.form.getFieldValue(['fitness']);
    fitness[props.field.fieldKey].place = void 0;
    props.form.setFieldsValue({ fitness });
  };

  return {
    typeOptions,
    placeOptions,
    onTypeChange,
  };
};

export default (props) => {
  const { field } = props;
  const state = useStateHook(props);

  return (
    <Row className={scss.row}>
      <Col span={22} >
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              {... field}
              label="类型"
              rules={[{
                required: true,
                message: '请选择类型!',
              }]}
              name={[field.name, 'type']}
              className={scss['form-item']}
              fieldKey={[field.fieldKey, 'type']}>
              <Select
                placeholder="类型"
                style={{ width: '100%' }}
                onChange={state.onTypeChange}>
                {state.typeOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              {... field}
              label="部位"
              rules={[{
                required: true,
                message: '请选择训练部位!',
              }]}
              name={[field.name, 'place']}
              className={scss['form-item']}
              fieldKey={[field.fieldKey, 'place']}>
              <Select
                placeholder="训练部位"
                style={{ width: '100%' }}>
                {state.placeOptions}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col
        span={2}
        className={scss['col-delete']}
        onClick={props.remove.bind(null, field.name)}>
        <Icon
          type="icon-shanchu"
          className={scss.delete}
        />
      </Col>
    </Row>
  );
};
