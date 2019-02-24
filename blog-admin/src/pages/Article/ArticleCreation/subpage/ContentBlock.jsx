import React from 'react';
import { Card, Input } from 'antd';
import { FontIcon } from '@components';
const { TextArea } = Input;

export default ({form}) => (
  <Card
    title="文章编写"
    className="block_third">
    {form.getFieldDecorator('content', {})(
      <TextArea autosize={{ minRows: 30, maxRows: 30 }}>描述</TextArea>
    )}
  </Card>
);
