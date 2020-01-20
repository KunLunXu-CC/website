import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import scss from './index.module.scss';
import fitnessProjects from '@config/fitnessProjects';

import {
  Col,
  Row,
  Form,
  Select,
  InputNumber,
} from 'antd';
import { FITNESS_TYPE, FITNESS_PLACE, FITNESS_FEEL } from '@config/consts';

const useStateHook = props => {
  const [projects, setProjects] = useState([]);
  const [showPlaceField, setShowPlaceField] = useState(false);

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

  // 训练感受下拉项
  const feelOptions = useMemo(() => (
    Object.values(FITNESS_FEEL).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  // 训练项目下拉项
  const projectOptions = useMemo(() => (
    projects.map(v => (
      <Select.Option value={v.value} key={v.value}>
        {v.desc}
      </Select.Option>)
    )
  ), [projects]);

  // 重置 projects
  const resetProjects = (type, place) => {
    const currentType = _.isNumber(type)
      ? type
      : props.form.getFieldValue(`fitness[${props.index}].type`);
    const currentPlace = _.isNumber(place)
      ? place
      : props.form.getFieldValue(`fitness[${props.index}].place`);
    const newProjects = fitnessProjects.filter(
      v => v.type === currentType && v.place === currentPlace
    );
    setProjects(newProjects);
  };

  // 是否显示 place 字段
  const resetShowPlaceField = type => {
    const currentType = _.isNumber(type)
      ? type
      : props.form.getFieldValue(`fitness[${props.index}].type`);
    setShowPlaceField(currentType === FITNESS_TYPE.ANAEROBIC.VALUE);
  };

  // place 修改
  const onPlaceChange = place => {
    props.form.setFieldsValue({
      [`fitness[${props.index}].project`]: void 0,
    });
    resetProjects(void 0, place);
  };

  // type 修改
  const onTypeChange = type => {
    props.form.setFieldsValue({
      [`fitness[${props.index}].project`]: void 0,
      [`fitness[${props.index}].place`]: void 0,
    });
    resetProjects(type);
    resetShowPlaceField(type);
  };

  useEffect(() => {
    if (_.get(props.modal, 'data.id')) {
      const type = _.get(props.modal, `data.fitness[${props.index}].type`);
      const place = _.get(props.modal, `data.fitness[${props.index}].place`);
      resetProjects(type, place);
      resetShowPlaceField(type);
    }
  }, [props.modal]);

  return {
    typeOptions,
    feelOptions,
    placeOptions,
    onTypeChange,
    onPlaceChange,
    showPlaceField,
    projectOptions,
  };
};

export default props => {
  const state = useStateHook(props);

  return (
    <Row gutter={16} className={scss.row}>
      <Col span={8}>
        <Form.Item label="类型" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].type`, {
            rules: [{
              required: true,
              message: '请选择类型!',
            }],
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].type`
            ),
          })(
            <Select
              placeholder="类型"
              style={{ width: '100%' }}
              onChange={state.onTypeChange}>
              {state.typeOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
      {state.showPlaceField ?
        <Col span={8}>
          <Form.Item label="部位" className={scss['form-item']}>
            {props.form.getFieldDecorator(`fitness[${props.index}].place`, {
              rules: [{
                required: true,
                message: '请选择训练部位!',
              }],
              initialValue: _.get(
                props,
                `modal.data.fitness[${props.index}].place`
              ),
            })(
              <Select
                placeholder="训练部位"
                style={{ width: '100%' }}
                onChange={state.onPlaceChange}>
                {state.placeOptions}
              </Select>
            )}
          </Form.Item>
        </Col> : null
      }
      <Col span={8}>
        <Form.Item label="项目" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].project`, {
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].project`
            ),
          })(
            <Select
              mode="multiple"
              placeholder="锻炼项目"
              style={{ width: '100%' }}>
              {state.projectOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="时长 (分钟) " className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].duration`, {
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].duration`
            ),
          })(
            <InputNumber
              min={0}
              placeholder="时长"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="感受" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].feel`, {
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].feel`
            ),
          })(
            <Select style={{ width: '100%' }} placeholder="感受">
              {state.feelOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};
