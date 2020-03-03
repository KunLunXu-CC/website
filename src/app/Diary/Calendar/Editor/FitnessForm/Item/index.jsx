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
import { Icon } from 'qyrc';

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
      : props.form.getFieldValue(['fitness', props.field.fieldKey, 'type']);
    const currentPlace = _.isNumber(place)
      ? place
      : props.form.getFieldValue(['fitness', props.field.fieldKey, 'place']);
    const newProjects = fitnessProjects.filter(
      v => v.type === currentType && v.place === currentPlace
    );
    setProjects(newProjects);
  };

  // 是否显示 place 字段
  const resetShowPlaceField = type => {
    const currentType = _.isNumber(type)
      ? type
      : props.form.getFieldValue(['fitness', props.field.fieldKey, 'type']);
    setShowPlaceField(currentType === FITNESS_TYPE.ANAEROBIC.VALUE);
  };

  // place 修改
  const onPlaceChange = place => {
    const fitness = props.form.getFieldValue(['fitness']);
    fitness[props.field.fieldKey].project = void 0;
    props.form.setFieldsValue(fitness);
    resetProjects(void 0, place);
  };

  // type 修改
  const onTypeChange = type => {
    const fitness = props.form.getFieldValue(['fitness']);
    fitness[props.field.fieldKey].project = void 0;
    fitness[props.field.fieldKey].place = void 0;
    props.form.setFieldsValue({ fitness });
    resetProjects(type);
    resetShowPlaceField(type);
  };

  useEffect(() => {
    if (_.get(props.modal, 'data.id')) {
      const type = _.get(
        props.modal,
        `data.fitness[${props.field.fieldKey}].type`
      );
      const place = _.get(
        props.modal,
        `data.fitness[${props.field.fieldKey}].place`
      );
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
              fieldKey={[field.fieldKey, 'type']}
            >
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
                  style={{ width: '100%' }}
                  onChange={state.onPlaceChange}>
                  {state.placeOptions}
                </Select>
              </Form.Item>
            </Col> : null
          }
          <Col span={8}>
            <Form.Item
              {... field}
              label="项目"
              className={scss['form-item']}
              name={[field.name, 'project']}
              fieldKey={[field.fieldKey, 'project']}>
              <Select
                mode="multiple"
                placeholder="锻炼项目"
                style={{ width: '100%' }}>
                {state.projectOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {... field}
              label="时长 (分钟) "
              className={scss['form-item']}
              name={[field.name, 'duration']}
              fieldKey={[field.fieldKey, 'duration']}>
              <InputNumber
                min={0}
                placeholder="时长"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {... field}
              label="感受"
              name={[field.name, 'feel']}
              className={scss['form-item']}
              fieldKey={[field.fieldKey, 'feel']}>
              <Select style={{ width: '100%' }} placeholder="感受">
                {state.feelOptions}
              </Select>
            </Form.Item>
          </Col>
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
