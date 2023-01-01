import { useMemo } from 'react';
import { Icon } from '@kunlunxu/brick';
import { Row, Col, InputNumber, Input, Form, Select, Empty } from 'antd';
import scss from './bill.module.scss';

const BILL = [
  { name: '三餐', value: 1 },
  { name: '加餐(健康)', value: 2 },
  { name: '聚餐', value: 3 },
  { name: '水果', value: 4 },
  { name: '日用百货', value: 5 },
  { name: '固定支出', value: 6 },
  { name: '服装穿戴', value: 7 },
  { name: '健身', value: 8 },
  { name: '大件', value: 9 },
  { name: '意外', value: 10 },
  { name: '加餐(不健康)', value: 11 },
  { name: '交通', value: 12 },
  { name: '收入 - 工资', value: 13 },
];

const useStateHook = () => {
  // 下拉框
  const billTagOptions = useMemo(() => BILL.map((v) => (
    <Select.Option
      value={v.value}
      key={v.value}>
      {v.name}
    </Select.Option>
  )), []);

  return { billTagOptions };
};

const Item = (props) => {
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
              name={[props.field.name, 'desc']}>
              <Input placeholder="账单描述" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {... props.field}
              label="标签"
              name={[props.field.name, 'tag']}>
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
              name={[props.field.name, 'income']}>
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
              name={[props.field.name, 'expend']}>
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

export default (props) => {
  const { tools: Tools } = props;

  return (
    <Form.List name="bill">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Item
              field={field}
              remove={remove}
              key={field.key}
              form={props.form}
            />
          ))}
          {fields.length === 0 ? <Empty /> : null}
          {props.showTools ? (
            <Tools>
              <Icon
                type="icon-xinzeng"
                onClick={add.bind(null, null)}
              />
            </Tools>
          ) : null}
        </>
      )}
    </Form.List>
  );
};
