import { Form, Card, Input, Button } from 'antd';
import React from 'react';
import { filterObject } from '@utils/helper';

const QueryBlock = ({ form, listStore }) => {

  /**
   * 查询块
   * - 获取查询参数
   * - 修改 listStore 中的查询条件
   */
  const onSearch = () => {
    const params = filterObject(form.getFieldsValue(), [null, undefined]);
    listStore.resetParams(params);
  };

  return (
    <Card className="block_first">
      <Form layout="inline">
        <Form.Item>
          {form.getFieldDecorator('name')(<Input placeholder="标签名" size="large"/>)}
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" onClick={onSearch} >
            查询
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default Form.create()(QueryBlock);
