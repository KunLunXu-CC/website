import scss from "./diet.module.scss";

import { memo, useCallback } from "react";
import { Icon } from "@kunlunxu/brick";
import { Row, Col, Select, Input, Form, Empty } from "antd";

const DIET = [
  { name: "早餐", value: 0 },
  { name: "上午加餐", value: 1 },
  { name: "午餐", value: 2 },
  { name: "下午加餐", value: 3 },
  { name: "晚餐", value: 4 },
  { name: "晚上加餐(夜宵)", value: 5 },
  { name: "健身加餐(健身之后)", value: 6 },
  { name: "零食", value: 7 },
];

// 类型下拉项
const TYPE_OPTIONS = DIET.map((v) => (
  <Select.Option value={v.value} key={v.value}>
    {v.name}
  </Select.Option>
));

const Item = (props) => (
  <Row gutter={16} className={scss.row}>
    <Col span={8}>
      <Form.Item
        {...props.field}
        label="类型"
        rules={[
          {
            required: true,
            message: "请选择类型!",
          },
        ]}
        name={[props.field.name, "type"]}
      >
        <Select style={{ width: "100%" }} placeholder="类型">
          {TYPE_OPTIONS}
        </Select>
      </Form.Item>
    </Col>
    <Col span={14}>
      <Form.Item
        {...props.field}
        label="描述"
        rules={[
          {
            required: true,
            message: "请填写描述!",
          },
        ]}
        name={[props.field.name, "desc"]}
      >
        <Input placeholder="饮食描述" />
      </Form.Item>
    </Col>
    <Col
      span={2}
      className={scss["col-delete"]}
      onClick={props.remove.bind(null, props.field.name)}
    >
      <Icon type="icon-shanchu" className={scss.delete} />
    </Col>
  </Row>
);

const Diet = (props) => {
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

  return <Form.List name="diet">{renderItems}</Form.List>;
};
export default memo(Diet);
