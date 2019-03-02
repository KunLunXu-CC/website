import React from 'react';
import { Card, Input, Form } from 'antd';
const { TextArea } = Input;

export default ({form}) => (
  <Card
    title="文章编写"
    className="block_third">
    <Form.Item>
      {form.getFieldDecorator('content', {
        rules:[{ required: true, message: '请输入文章内容' }]
      })(
        <TextArea autosize={{ minRows: 30, maxRows: 30 }} placeholder="请输入文章内容" />
      )}
    </Form.Item>
  </Card>
);
