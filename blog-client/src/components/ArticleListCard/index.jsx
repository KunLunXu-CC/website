import React from 'react';
import ImgContainer from '../ImgContainer/index';
import './index.less';

export default class ArticleListCard extends React.Component{
  render(){
    return (
      <div id="article-list-card">
        <div className="card-item">
          <ImgContainer animation="pulse" img={this.props.img} />
        </div>
        <div className="card-item">
          <div className="header">
            <div className="tag">经验观点</div>
            <h2 className="title">你知道吗?智能家居是长这样的</h2>
          </div>
          <div className="content">
            本文聚焦于AI交互中的眼动研究和传统互联网眼动研究的异同，从眼动技术本身、研究内容的延展、眼动分析思路的差异、眼动研究注意事项，这四个方面，来探讨AI时代眼动研究的变与不变。
          </div>
          <div className="footer">
            <div className="footer-left">
              <div className="avatar">
                <ImgContainer 
                  borderRadius="50%"
                  img={this.props.img} 
                />
              </div>
              <divb className="username">
                qianyin925
              </divb>
              <div className="browse">
                1084
              </div>
              <div className="comment">
                2048
              </div>
            </div>
            <div className="time">
              2018-12-21 18:00
            </div>
          </div>
        </div>
      </div>
    );
  }
}
