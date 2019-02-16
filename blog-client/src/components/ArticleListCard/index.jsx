import React from 'react';
import ImgContainer from '../ImgContainer/index';
import clamp from '@utils/clamp'; 
import './index.scss';

/**
 * 文章列表卡片
 * @param {String} props.tagText 标签文字
 * @param {String} props.tagBG 标签背景颜色
 * @param {String} props.title 文章标题
 * @param {String} props.desc 文字描述
 * @param {String} props.author 作者
 * @param {String} propx.avatar 头像
 * @param {Number} propx.browse 浏览量
 * @param {Number} propx.comment 评论量
 * @param {Date} propx.time 发布时间
 * @param {Object} propx.style 样式
 */
export default class ArticleListCard extends React.Component{
  constructor(){
    super();
    this.contentRef = React.createRef();
    this.state={
      mouseOver: false
    }
  }

  componentDidMount(){
    clamp(this.contentRef.current, 2);
  }

  setMouseOver = (mouseOver) => {
    this.setState({mouseOver});
  }

  /**
   * 鼠标移入组件事件
   */
  onMouseOver = () => {
    this.setMouseOver(true);
  }

  /**
   * 鼠标移出组件事件
   */
  onMouseOut = () => {
    this.setMouseOver(false);
  }
  
  render(){
    return (
      <div 
        id="article-list-card" 
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={this.props.style || {}}>
        <div className="card-item">
          <ImgContainer
            mouseOver={this.state.mouseOver}
            animation="pulse" 
            img={this.props.img} />
        </div>
        <div className="card-item">
          <div className="header">
            <div className="tag single-row">经验观点</div>
            <div className="title"><h2 className="single-row">你知道吗?智能家居是长这样的</h2></div>
          </div>
          <div ref={this.contentRef} className="content">    
            本文聚焦于AI交互中的眼动研究和传统互联网眼动研究的异同，从眼动技术本身、研究内容的延展、眼动分析思路的差异.......
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
                <svg className="icon" ariaHidden="true">
                  <use xlinkHref="#icon-yulan"></use>
                </svg>
                1084
              </div>
              <div className="comment">
                <svg className="icon" ariaHidden="true">
                  <use xlinkHref="#icon-pinglun"></use>
                </svg>
                2048
              </div>
            </div>
            <div className="time">
              <svg className="icon" ariaHidden="true">
                <use xlinkHref="#icon-shijian2"></use>
              </svg>
              2018-12-21 18:00
            </div>
          </div>
        </div>
      </div>
    );
  }
}
