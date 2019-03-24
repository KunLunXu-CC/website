import './index.scss';
import { Form } from 'antd';
import _ from 'lodash';
import { getList } from '@server/article';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as articleServer from '@server/article';
import ThumbBlock from './subpage/ThumbBlock';
import ContentBlock from './subpage/ContentBlock';
import SettingBlock from './subpage/SettingBlock';
import PreviewBlock from './subpage/PreviewBlock';
import ActionsBlock from './subpage/ActionsBlock';

const useStateHook = (props) => {
  const [article, setArticle] = useState({}); 

  // 组件加载完毕
  useEffect(() => {
    init();
  }, []);

  // 更新 form Data
  useEffect(() => {
    const pickData = _.pick(article, ['name', 'tags', 'desc', 'thumb', 'content']);
    pickData.tags = (pickData.tags || []).map(v => v.id);
    props.form.setFieldsValue({...pickData});
  }, [article]);

  // 初始化
  const init = () => {
    const { articleId } = props.match.params;
    if ( articleId ){
      getList({ params: {id: articleId} }).then(res => {
        const article = res.list[0];
        setArticle({...article});
      });
    } else {
      articleServer.init().then( id=> {
        props.history.push(`/article/creation/${id}`);
      });
    }
  }

  return { article, setArticle };
}

let ArticleCreation = (props) => {
  const { setArticle } = useStateHook(props);

  return (
    <Form>
      <SettingBlock form={props.form}/>
      <ThumbBlock form={props.form} />
      <ContentBlock form={props.form}/>
      <ActionsBlock 
        form={props.form} 
        setArticle={setArticle}
      />
      <PreviewBlock form={props.form}/>
    </Form>
  );
}

ArticleCreation = withRouter(ArticleCreation);
ArticleCreation = Form.create({})(ArticleCreation);
export default ArticleCreation;
