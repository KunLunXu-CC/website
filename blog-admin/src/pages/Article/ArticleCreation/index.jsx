import React, { Fragment } from 'react';
import './index.scss';
import ContentBlock from './subpage/ContentBlock';
import TitleBlock from './subpage/TitleBlock';
import PreviewBlock from './subpage/PreviewBlock';

class ArticleCreation extends React.Component{
  render(){
    return (
      <Fragment>
        <TitleBlock />
        <ContentBlock />
        <PreviewBlock />
      </Fragment>
    );
  }
}
export default ArticleCreation;
