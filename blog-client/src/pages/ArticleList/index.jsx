import React, { Component } from 'react';
import LeftUserBlock from './subpage/LeftUserBlock';
import RightArticleList from './subpage/RightArticleList';

import './index.less';

class ArticleList extends Component{
  render(){
    return (
      <div className="home-page">
        <LeftUserBlock />
        <RightArticleList /> 
      </div>
    );
  }
}
export default ArticleList;
