import _ from 'lodash';

class Helper {
  constructor(){
    // modal 可缩小的默认最小宽高
    this.MIN_H = 100;
    this.MIN_W = 100;
    // 容错(边界、 拖拽)
    this.FT_BORDER = 2;
    this.FT_DRAG = 30;
  }

  /**
   * 格式化事件对象 clientX clientY： 限制 clientX clientY 不超出容器视口
   * @param {Number} clientX    事件对象 clientX
   * @param {Number} clientY    事件对象 clientY
   * @param {Object} modalRef   modal ref
   * @return {Object} { clientX, clientY } 格式化后的 clientX, clientY
   */
  formatClient = ({ clientX, clientY, modalRef }) => {
    const parent = modalRef.current.parentNode;
    const rect = parent.getBoundingClientRect();
    return {
      clientX: clientX < rect.left ? rect.left : clientX > rect.right  ? rect.right  : clientX,
      clientY: clientY < rect.top  ? rect.top  : clientY > rect.bottom ? rect.bottom : clientY,
    };
  }

  /**
   * 拖拽处理函数
   * @param {Object} e                事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         moda ref
   * @return {Object} {translateX, translateY} styleParams 用于计算样式
   */
  hDrag = ({ e, mouseDownState, modalRef }) => {
    let { 
      translateY,
      translateX, 
      clientX: oldClientX, 
      clientY: oldClientY, 
    } = mouseDownState;
    const { clientX, clientY } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    return { 
      translateX: translateX + (clientX - oldClientX),
      translateY: translateY + (clientY - oldClientY),
    };
  }

  /**
   * modal 左边框移动处理函数
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minW             modal 允许缩小的最下宽度
   * @return {Object} { width, translateX } styleParams 用于计算样式
   */
  hLeft = ({ e, mouseDownState, modalRef, minW = this.MIN_W }) => {
    let { width, left, translateX } = mouseDownState;
    const { clientX } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    
    let offset = left - clientX;
    width = width + offset;
    translateX = translateX - offset;
    if (width < minW){
      offset = minW - width;
      translateX = translateX - offset;
      width = width + offset;
    }
    return { width, translateX };
  }

  hRight = ({ e, mouseDownState, modalRef, minW = this.MIN_W }) => {
    let { width, right } = mouseDownState;
    const { clientX } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    width = width + (clientX - right);
    width < minW && (width = minW);
    return { width };
  }

  hTop = ({ e, mouseDownState, modalRef, minH = this.MIN_H }) => {
    let { height, top, translateY } = mouseDownState;
    const { clientY } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    let offset = top - clientY;
    height = height + offset; 
    translateY = translateY - offset;
    if (height < minH){
      offset = minH - height;
      translateY = translateY - offset;
      height = height + offset;
    }
    return { height, translateY };
  }

  hBottom = ({ e, mouseDownState, modalRef, minH = this.MIN_H }) => {
    let { height, bottom } = mouseDownState;
    const { clientY } = this.formatClient({
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    height = height + (clientY - bottom);
    height < minH && (height = minH);
    return { height };
  }

  hLeftTop = (...args) => ({ ...this.hLeft(...args), ...this.hTop(...args)});

  hRightTop = (...args) => ({ ...this.hRight(...args), ...this.hTop(...args)});

  hLeftBottom =(...args) => ({ ...this.hLeft(...args), ...this.hBottom(...args)});

  hRightBottom = (...args) => ({ ...this.hRight(...args), ...this.hBottom(...args)});

  // 鼠标状态映射配置(鼠标事件 clientX, clientY， modal rect(left, top, right, bottom) )
  mergeMouseState = (state) => {
    const onWidth = state.left - state.clientX < this.FT_BORDER && state.clientX - state.right < this.FT_BORDER;
    const onHeight = state.top - state.clientY < this.FT_BORDER && state.clientY - state.bottom < this.FT_BORDER;
    const onLeft = Math.abs(state.clientX - state.left) <= this.FT_BORDER  && onHeight;
    const onRight = Math.abs(state.clientX - state.right) <= this.FT_BORDER && onHeight;
    const onBottom = Math.abs(state.clientY - state.bottom) <= this.FT_BORDER && onWidth;
    const onTop = Math.abs(state.clientY - state.top) <= this.FT_BORDER && onWidth;

    const onDrag = state.clientY - state.top > 0 && state.clientY - state.top < this.FT_DRAG && onWidth;

    const settingList = [{
      conds:  onLeft && !onTop && !onBottom,
      cursor: 'w-resize',
      handler: this.hLeft,
      type: 'left'
    }, {
      conds:  onRight && !onTop && !onBottom,
      cursor: 'e-resize',
      handler: this.hRight,
      type: 'right'
    }, {
      conds:  onTop && !onLeft && !onRight,
      cursor: 'n-resize',
      handler: this.hTop,
      type: 'top'
    }, {
      conds:  onBottom && !onLeft && !onRight,
      cursor: 's-resize',
      handler: this.hBottom,
      type: 'bottom'
    }, {
      conds:  onLeft && onTop,
      cursor: 'nw-resize',
      handler: this.hLeftTop,
      type: 'leftTop'
    }, {
      conds:  onRight && onTop,
      cursor: 'ne-resize',
      handler: this.hRightTop,
      type: 'rightTop'
    }, {
      conds:  onLeft && onBottom,
      cursor: 'sw-resize',
      handler: this.hLeftBottom,
      type: 'leftBottom'
    }, {
      conds:  onRight && onBottom,
      cursor: 'se-resize',
      handler: this.hRightBottom,
      type: 'rightBottom'
    }, {
      conds:  onDrag,
      cursor: 'pointer',
      handler: this.hDrag,
      type: 'drag',
    }, {
      conds:  true,
      cursor: 'auto',
      handler: null,
      type: null,
    }];
    const filter = settingList.filter(v => v.conds)[0];
    return { ...state, ...filter };
  }

  /**
   * 获取鼠标状态 modal 上的状态(事件对象、modalRef) return {状态}
   * @return {Object} 
   * {
   *  type, 
   *  conds, 
   *  cursor, 
   *  handler, 
   *  clientX, clientY, 
   *  top, left, right, bottom, 
   *  width, height,
   *  translateX, translateY, 
   * }
   */
  getMouseState = ({ e, modalRef, styleParams }) => {
    // 1. 获取 e clientx clienty
    const { clientX, clientY } = e;
    // 2. 获取 modal left, top, right, bottom
    const  rect = modalRef.current.getBoundingClientRect();
    const { left, top, right, bottom } = rect;
    // 3. 计算
    const revalue = this.mergeMouseState({ 
      clientX, clientY, left, top, right, bottom, ...styleParams
    });
    // 4. 返回： {type， cursor, handler}
    return revalue; 
  }
 
}

export default new Helper(); 
