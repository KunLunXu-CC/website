import React from 'react';
import { FormItem } from '@components';
import { Card, Input } from 'antd';

export default ({form}) => {
  return (
    <Card title="缩略图设置" className="block_second">
      <FormItem label="缩略图" length="3">
        {form.getFieldDecorator('thumb', {
        })(
          <Input placeholder="请输入缩略图地址"/>
        )}
      </FormItem>
    </Card>
  );
}
