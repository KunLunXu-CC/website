import React from 'react';
import ImgContainer from '../../components/ImgContainer/index';
import IMG from '../../assets/img/tx.jpg';
import './index.scss';

export default class LeftMenu extends React.Component{
  render(){
    // #7ec2f1
    return (
      <div id="leftMenu">
        <div className="user-info">
          <ImgContainer 
            width="100px"
            borderRadius="50%"
            border="5px solid #fff"
            height="100px"
            img={IMG}/>
          <h3>潜 隐</h3>
          <p>前半生不怕 后半生不悔</p>
        </div>
        <div className="menu">
          <div>主页</div>
          <div>归档</div>
          <div>所有文章/关于我</div>
        </div>
      </div>
    );
  }
} 
