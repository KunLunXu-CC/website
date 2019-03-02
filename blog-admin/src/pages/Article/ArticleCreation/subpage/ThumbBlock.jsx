import React from 'react';
import { StableLabel } from '@components';
import { Card, Input } from 'antd';

export default ({form}) => {
  return (
    <Card title="缩略图设置" className="block_second">
      <StableLabel label="缩略图" length="3" right>
        {form.getFieldDecorator('thumb', {
        })(
          <Input placeholder="请输入缩略图地址"/>
        )}
      </StableLabel>
    </Card>
  );
}
