import React, { Fragment }from 'react';
import { Card, Input } from 'antd';
const { TextArea } = Input;

export default ({form}) => (
  <Card
    title="一般设置"
    className="block_first">
    {form.getFieldDecorator('name', {})(
      <Input className="title-wrapper-input" placeholder="请输入标题"/>
    )}
    {form.getFieldDecorator('desc', {})(
      <TextArea autosize={{ minRows: 4, maxRows: 4 }}>描述</TextArea>
    )}
  </Card>
);
