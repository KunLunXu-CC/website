import React, {
  useMemo,
  Fragment,
} from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { DIET_TYPE } from '@config/consts';
import { Row, Col, Select, Input, Form } from 'antd';

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
  const state = useStateHook(props);
  const { tools: Tools } = props;

  return (
    <Form.List name="diet">
      {(fields, { add, remove }) => (
        <Fragment>
          {fields.map(field => (
            <Row
              gutter={16}
              key={field.key}
              className={scss.row}>
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
                  <Select style={{ width: '100%' }} placeholder="类型">
                    {state.typeOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  {... field}
                  label="描述"
                  rules = {[{
                    required: true,
                    message: '请填写描述!',
                  }]}
                  name={[field.name, 'desc']}
                  className={scss['form-item']}
                  fieldKey={[field.fieldKey, 'desc']}>
                  <Input placeholder="饮食描述"/>
                </Form.Item>
              </Col>
              <Col
                span={2}
                className={scss['col-delete']}
                onClick={remove.bind(null, field.name)}>
                <Icon type="icon-shanchu" className={scss.delete}/>
              </Col>
            </Row>
          ))}
          {props.showTools ?
            <Tools>
              <Icon
                type="icon-xinzeng"
                onClick={add.bind(null, null)}
              />
            </Tools> : null}
        </Fragment>
      )}
    </Form.List>
  );
};
