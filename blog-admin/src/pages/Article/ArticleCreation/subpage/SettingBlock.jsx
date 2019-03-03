import React from 'react';
import { useOptionsHook } from '@hook';
import { FormItem } from '@components';
import { Card, Input, Select } from 'antd';
const { TextArea } = Input;

export default ({form}) => {
  const tagOptions = useOptionsHook({ model: 'Tag' });
  return (
    <Card
      title="一般设置"
      className="block_first">
      
      <FormItem label="标题" length="3" required>
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入文章标题' }],
        })(
          <Input placeholder="请输入文章标题"/>
        )}
      </FormItem>

      <FormItem label="标签" length="3">
        {form.getFieldDecorator('tags', {
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择标签"
          >
            { tagOptions.options }
          </Select>
        )}
      </FormItem>

      <FormItem label="概要" length="3">
        {form.getFieldDecorator('desc', {
        })(
          <TextArea autosize={{ minRows: 6, maxRows: 6 }} placeholder="请输入文章概要" />
        )}
      </FormItem>
    </Card>
  );
};
