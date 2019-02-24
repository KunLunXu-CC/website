import './index.scss';
import React from 'react';
import { Form } from 'antd';
import ThumbBlock from './subpage/ThumbBlock';
import ContentBlock from './subpage/ContentBlock';
import SettingBlock from './subpage/SettingBlock';
import PreviewBlock from './subpage/PreviewBlock';
import ActionsBlock from './subpage/ActionsBlock';

const ArticleCreation = ({form}) => {
  return (
    <Form>
      <SettingBlock form={form}/>
      <ThumbBlock form={form} />
      <ContentBlock form={form}/>
      <ActionsBlock form={form} />
      <PreviewBlock form={form}/>
    </Form>
  );
}

export default Form.create({})(ArticleCreation);
