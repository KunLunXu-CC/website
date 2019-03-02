import React from 'react';
import { FontIcon } from '@components';
import { Card, Input, Icon } from 'antd';

export default ({form}) => {
  return (
    <Card 
      title="操作按钮" 
      className="block_fourth"
      bodyStyle={{padding: '0'}}
      actions={[
        <FontIcon icon="#icon-quxiao" />,
        <FontIcon icon="#icon-baocun" />,
        <FontIcon icon="#icon-fabu" />,
      ]}
    />
  );
}
