import scss from "./fitness.module.scss";

import { Col, Row, Form, Empty, Select } from "antd";
import { memo, useCallback } from "react";
import { Icon } from "@kunlunxu/brick";

const FITNESS_TYPE = [
  { name: "有氧", value: 0 },
  { name: "无氧", value: 1 },
];

const FITNESS_PLACES = [
  { name: "背", value: 0 },
  { name: "胸", value: 1 },
  { name: "肩", value: 2 },
  { name: "肱二头", value: 3 },
  { name: "肱三头", value: 4 },
  { name: "腹", value: 5 },
  { name: "腿", value: 6 },
  { name: "小臂", value: 7 },
];

// 类型下拉项
const TYPE_OPTIONS = FITNESS_TYPE.map((v) => (
  <Select.Option value={v.value} key={v.value}>
    {v.name}
  </Select.Option>
));

// 训练部位下拉项
const PLACE_OPTIONS = FITNESS_PLACES.map((v) => (
  <Select.Option value={v.value} key={v.value}>
    {v.name}
  </Select.Option>
));

const Item = (props) => {
  const { field } = props;

  const onTypeChange = () => {
    const fitness = props.form.getFieldValue(["fitness"]);
    fitness[props.field.fieldKey].place = void 0;
    props.form.setFieldsValue({ fitness });
  };

  return (
    <Row className={scss.row}>
      <Col span={22}>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              {...field}
              label="类型"
              rules={[
                {
                  required: true,
                  message: "请选择类型!",
                },
              ]}
              name={[field.name, "type"]}
            >
              <Select
                placeholder="类型"
                onChange={onTypeChange}
                style={{ width: "100%" }}
              >
                {TYPE_OPTIONS}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              {...field}
              label="部位"
              rules={[
                {
                  required: true,
                  message: "请选择训练部位!",
                },
              ]}
              name={[field.name, "place"]}
            >
              <Select placeholder="训练部位" style={{ width: "100%" }}>
                {PLACE_OPTIONS}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col
        span={2}
        className={scss["col-delete"]}
        onClick={props.remove.bind(null, field.name)}
      >
        <Icon type="icon-shanchu" className={scss.delete} />
      </Col>
    </Row>
  );
};

const Fitness = (props) => {
  const { isShow, addRef } = props;

  const renderItems = useCallback(
    (fields, { add, remove }) => {
      if (isShow) {
        addRef.current = add;
      }

      return fields.length === 0 ? (
        <Empty />
      ) : (
        fields.map((field) => (
          <Item
            field={field}
            remove={remove}
            key={field.key}
            form={props.form}
          />
        ))
      );
    },
    [addRef, isShow, props.form],
  );

  return <Form.List name="fitness">{renderItems}</Form.List>;
};
export default memo(Fitness);
