import React from 'react';
import { FontIcon } from '@components';
import { Card } from 'antd';
import { createArticle } from '@server/article';

export default ({form}) => {

  const onCancel = () => {
    console.log('----- 取消 -----');
  }

  const onSave = () => {
    form.validateFieldsAndScroll((errors, values) => {
      !errors && createArticle({ body: values });
    });
  }

  const onPublish = () => {
    form.validateFieldsAndScroll((errors, values) => {
      console.log('----- 发布 -----', values);
    });
  }

  return (
    <Card 
      title="操作按钮" 
      className="block_fourth"
      bodyStyle={{padding: '0'}}
      actions={[
        <FontIcon 
          size="18px"
          label="取消"
          onClick = {onCancel}
          icon="#icon-quxiao" 
        />,
        <FontIcon 
          size="18px"
          label="保存"
          onClick = {onSave}
          icon="#icon-baocun" 
        />,
        <FontIcon 
          size="18px"
          label="发布"
          icon="#icon-fabu" 
          onClick = {onPublish}
        />,
      ]}
    />
  );
}
