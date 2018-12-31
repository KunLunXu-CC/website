import React from 'react';

import ArticleListCard from '@components/ArticleListCard/index';
import IMG from '@assets/img/2018-11-2218:12:17.png';

class RightArticleList extends React.Component{
  render(){
    return (
      <div className="right-article-list">
        <div className="article-item-container">
          <div className="article-item-wrapper">
            <ArticleListCard img={IMG}/>
          </div>
        </div>

        <div className="article-item-container">
          <div className="article-item-wrapper">
            <ArticleListCard img={IMG}/>
          </div>
        </div>

        <div className="article-item-container">
          <div className="article-item-wrapper">
            <ArticleListCard img={IMG}/>
          </div>
        </div>

        <div className="article-item-container">
          <div className="article-item-wrapper">
            <ArticleListCard img={IMG}/>
          </div>
        </div>
      </div>
    );
  }
}
export default RightArticleList;
