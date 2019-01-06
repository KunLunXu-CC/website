/**
 * props.animation  鼠标停放动效  "pulse"
 * props.mouseOver 鼠标是否停放在组件处
 * props.img 图片
 * props.width 组件宽度，默认 100%
 * props.height 组件高度， 默认 100%
 */
import React, { Component } from 'react';
import './index.scss';

export default class ImgContainer extends Component{
  constructor(){
    super();
    this.wrapperRef = React.createRef();
    this.imgRef = React.createRef();
    this.state = {
      width: 'auto',
      height: 'auto'
    };
  }

  componentWillMount(){
    this.bindEvent();
  }

  componentDidMount(){
    this.refreshImgStyle();
  }

  componentWillUnmount(){
    this.removeEvent();
  }

  componentDidUpdate(preProps, preState){
    this.handlerMouseOver(preProps, preState);
  }

  handlerMouseOver = (preProps, preState) => {
    const preMouseOver = preProps.mouseOver;
    const nextMouseOver = this.props.mouseOver;
    if (preMouseOver !== nextMouseOver){
      nextMouseOver && this.onMouseOver();
      !nextMouseOver && this.onMouseOut();
    }
  }

  /**
   * 刷新重置图片样式：宽度、 高度
   */
  refreshImgStyle = () => {
    const {
      wrapperWidth, wrapperHeight, wrapperProportion, 
      imgWidth, imgHeight, imgProportion
    } = this.getParams();
    let { width, height } = this.state;
    const calculatedHeight = wrapperWidth / imgProportion;
    if (calculatedHeight < wrapperHeight){
      this.setState({ width: 'auto', height: wrapperHeight })
    } else if (width !== wrapperWidth) {
      this.setState({ width: wrapperWidth, height: 'auto' });
    }
  };

  /**
   * 获取参数： 容器宽高、容器宽高比例、图片宽高、图片宽高比例
   * @return {Number} wrapperWidth      容器宽
   * @return {Number} wrapperHeight     容器高
   * @return {Number} wrapperProportion 容器宽高比
   * @return {Number} imgWidth          图片宽
   * @return {Number} imgHeight         图片高
   * @return {Number} imgProportion     图片宽高比
   */
  getParams = () => {
    const wrapperWidth = this.wrapperRef.current.offsetWidth;
    const wrapperHeight = this.wrapperRef.current.offsetHeight;
    const wrapperProportion = wrapperWidth / wrapperHeight;
    const imgWidth = this.imgRef.current.offsetWidth;
    const imgHeight = this.imgRef.current.offsetHeight;
    const imgProportion = imgWidth / imgHeight;
    return {
      wrapperWidth, wrapperHeight, wrapperProportion, 
      imgWidth, imgHeight, imgProportion
    }; 
  }

  /**
   * 绑定事件: onresize
   */
  bindEvent = () => {
    window.addEventListener('resize', this.refreshImgStyle);
  }

  /**
   * 移除事件: onresize
   */
  removeEvent = () => {
    window.removeEventListener('resize', this.refreshImgStyle);
  }

  /**
   * 鼠标移入组件事件
   */
  onMouseOver = () => {
    this.animation();
  }

  /**
   * 鼠标移出组件事件
   */
  onMouseOut = () => {
    this.refreshImgStyle();
  }

  /**
   * 动画函数: 获取动画映射配置 , 执行对应的动画
   */
  animation = () => {
    if (!this.props.animation){return false;}
    const params = this.animationParams[this.props.animation];
    params.handler(params.value)
  }

  /**
   * 鼠标停放(onMouseOver)动画: 缩放图片整体放大缩小
   * @param {Number} proportion 缩放比例
   */
  pulse = (proportion) => {
    let { width, height } = this.state;
    if ( width === 'auto' ){
      this.setState({height: height * proportion});
    } else {
      this.setState({width: width * proportion});
    }
  }

  render(){
    return (
      <div 
        ref={this.wrapperRef}
        className="img-container"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={this.wrapperStyle} 
      >
        <img 
          onLoad = {this.refreshImgStyle}
          ref={this.imgRef}
          style={this.imgStyle}
          src={this.props.img} alt="图片"
        />
      </div>
    );
  }

  // 动画映射配置 handler 动画处理函数, value动画的参数
  get animationParams(){
    return {
      pulse: { handler: this.pulse, value: 1.2}
    };
  }

  // 包裹层样式
  get wrapperStyle(){
    return {
      borderRadius: this.props.borderRadius || '0px',
      width: this.props.width || '100%',
      height: this.props.height || '100%'
    }
  }

  // 图片样式
  get imgStyle(){
    return {
      width: this.state.width, 
      height: this.state.height
    };
  }
}
