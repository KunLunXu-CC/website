/**
 * blog 为整体布局框架
 * - 布局采用 flex 布局
 * - 整体页面分为上下两块
 *  - 上为 header 部分： 盛放加载进度条等
 *  - 下半部分为其余部分：又进行了左右布局， 
 *    - 左侧为左测信息栏
 *    - 右测为内容块，其中又进行了上下布局
 *      - 上部分为内容 body 区块
 *      - 下部分为 footer 区块
 * - 所有大的自适应区块具有 100% 高， 并且只显示 Y 轴滚动条， X 方向则溢出隐藏
 * - 滚动条由本组件进行控制
 * - 所有 blog 页面的整体的大小（min-width） 由该页面控制
 */
import React from 'react';
import './index.scss';
import Header from './subpage/Header';
import Footer from './subpage/Footer';

class Base extends React.Component{
  render(){
    return (
      <div id="base-page">
        <div className="base-page-top">
          <Header />
        </div>
        <div className="base-page-bottom">
          <div className="base-page-bottom-left-menu">
            {this.props.leftMenu}
          </div>
          <div className="base-page-bottom-right-content">
            <div className="base-page-bottom-right-content-body">
              {this.props.body}
            </div>
            <div className="base-page-bottom-right-content-footer">
              <Footer></Footer>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default Base;
