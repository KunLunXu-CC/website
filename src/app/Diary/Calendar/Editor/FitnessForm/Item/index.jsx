import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { useSelector } from 'react-redux';
import { DIARY_EDITOR_DIARY } from '../../../../consts';

import {
  Col,
  Row,
  Form,
  Select,
} from 'antd';
import { FITNESS_TYPE, FITNESS_PLACE } from '@config/consts';
import { Icon } from 'qyrc';

const useStateHook = props => {
  const [showPlaceField, setShowPlaceField] = useState(false);

  // 弹窗
  const modal = useSelector(state => state.modal[DIARY_EDITOR_DIARY]);

  // 类型下拉项
  const typeOptions = useMemo(() => (
    Object.values(FITNESS_TYPE).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  // 训练部位下拉项
  const placeOptions = useMemo(() => (
    Object.values(FITNESS_PLACE).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  // 是否显示 place 字段
  const resetShowPlaceField = type => {
    const currentType = _.isNumber(type)
      ? type
      : props.form.getFieldValue(['fitness', props.field.fieldKey, 'type']);
    setShowPlaceField(currentType === FITNESS_TYPE.ANAEROBIC.VALUE);
  };

  // type 修改
  const onTypeChange = type => {
    const fitness = props.form.getFieldValue(['fitness']);
    fitness[props.field.fieldKey].project = void 0;
    fitness[props.field.fieldKey].place = void 0;
    props.form.setFieldsValue({ fitness });
    resetShowPlaceField(type);
  };

  useEffect(() => {
    if (modal && _.get(modal, 'diary.id')) {
      const type = _.get(
        modal,
        `diary.fitness[${props.field.fieldKey}].type`
      );
      resetShowPlaceField(type);
    }
  }, [modal]);

  return {
    typeOptions,
    placeOptions,
    onTypeChange,
    showPlaceField,
  };
};

export default props => {
  const { field } = props;
  const state = useStateHook(props);

  return (
    <Row className={scss.row}>
      <Col span={22} >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              {... field}
              label="类型"
              rules = {[{
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
          {state.showPlaceField ?
            <Col span={8}>
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
            </Col> : null
          }
        </Row>
      </Col>
      <Col
        span={2}
        className={scss['col-delete']}
        onClick={props.remove.bind(null, field.name)}>
        <Icon type="icon-shanchu" className={scss.delete}/>
      </Col>
    </Row>
  );
};
