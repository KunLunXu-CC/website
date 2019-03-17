import './index.scss';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import * as articleServer from '@server/article';
import ThumbBlock from './subpage/ThumbBlock';
import ContentBlock from './subpage/ContentBlock';
import SettingBlock from './subpage/SettingBlock';
import PreviewBlock from './subpage/PreviewBlock';
import ActionsBlock from './subpage/ActionsBlock';

const useStateHook = (props) => {
  // 初始化
  const init = () => {
    const {articleId} = props.match.params;
    if ( articleId ){
      console.log('有 id ===================>>>>>>');
    } else {
      console.log('没有 id ===================>>>>>>');
      articleServer.init().then( id=> {
        props.history.push(`/article/creation/${id}`);
      });
    }
  }

  // 组件加载完毕
  useEffect(() => {
    init();
  }, []);
}

let ArticleCreation = (props) => {
  return (
    <Form>
      <SettingBlock form={props.form}/>
      <ThumbBlock form={props.form} />
      <ContentBlock form={props.form}/>
      <ActionsBlock form={props.form} />
      <PreviewBlock form={props.form}/>
    </Form>
  );
}

ArticleCreation = withRouter(ArticleCreation);
ArticleCreation = Form.create({})(ArticleCreation);
export default ArticleCreation;
