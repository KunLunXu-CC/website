import React from 'react';
import { Form, Card, Input, Button } from 'antd';

const QueryBlock = (props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Card>
      <Form layout="inline">
        <Form.Item>
          {getFieldDecorator('userName')(
            <Input placeholder="标签名" size="large"/>
          )}
        </Form.Item>
        <Form.Item>
          <Button 
            size="large" 
            type="primary" 
            onClick={() => {}}
          >
            查询
        </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default Form.create()(QueryBlock);
