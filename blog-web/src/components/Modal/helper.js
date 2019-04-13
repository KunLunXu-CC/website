import _ from 'lodash';

class Helper {
  constructor(){
    this.MIN_H = 100;
    this.MIN_W = 100;
    // 容错
    this.FT = 10;
  }

  formatClient = ({ clientX, clientY, modalRef}) => {
    const parent = modalRef.current.parentNode;
    const { left, top, right, bottom } = parent.getBoundingClientRect();
    return {
      clientX: clientX < left ? left : clientX > right ? right : clientX,
      clientY: clientY < top ? top : clientY > bottom ? bottom : clientY
    };
  }

  // 一系列处理方法: return { width, height, translateX, translateY }
  hLeft = ({e, mouseDownState, modalRef, minH = this.MIN_H, minW = this.MIN_W}) => {
    const { width, left, translateX } = mouseDownState;
    const { clientX } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    const offset = left - clientX;
    return { width: width + offset, translateX: translateX - offset };
  }

  hRight = ({e, mouseDownState, modalRef}) => {
    const { width, right } = mouseDownState;
    const { clientX } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    return { width: width + (clientX - right) };
  }

  hTop = ({e, mouseDownState, modalRef}) => {
    const { height, top, translateY } = mouseDownState;
    const { clientY } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    const offset = top - clientY;
    return { height: height + offset, translateY: translateY - offset };
  }

  hBottom = ({e, mouseDownState, modalRef}) => {
    const { height, bottom } = mouseDownState;
    const { clientY } = this.formatClient({
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    return { height: height + (clientY - bottom) };
  }

  hLeftTop = (...args) => ({ ...this.hLeft(...args), ...this.hTop(...args)});

  hRightTop = (...args) => ({ ...this.hRight(...args), ...this.hTop(...args)});

  hLeftBottom =(...args) => ({ ...this.hLeft(...args), ...this.hBottom(...args)});

  hRightBottom = (...args) => ({ ...this.hRight(...args), ...this.hBottom(...args)});

  // 鼠标状态映射配置(鼠标事件 clientX, clientY， modal rect(left, top, right, bottom) )
  mergeMouseState = (state) => {
    const onWidth = state.left - state.clientX < this.FT && state.clientX - state.right < this.FT;
    const onHeight = state.top - state.clientY < this.FT && state.clientY - state.bottom < this.FT;
    const onLeft = Math.abs(state.clientX - state.left) <= this.FT  && onHeight;
    const onRight = Math.abs(state.clientX - state.right) <= this.FT && onHeight;
    const onBottom = Math.abs(state.clientY - state.bottom) <= this.FT && onWidth;
    const onTop = Math.abs(state.clientY - state.top) <= this.FT && onWidth;

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
      conds:  true,
      cursor: 'auto',
      handler: null,
      type: null,
    }];
    const filter = settingList.filter(v => v.conds)[0];
    return { ...state, ...filter };
  }

  /**
   * 获取鼠标在 modal 上的状态(事件对象、modalRef) return {状态}
   * @return {Object} 
   * {
   *  clientX, 
   *  clientY, 
   *  conds, 
   *  cursor, 
   *  handler, 
   *  height, 
   *  top, 
   *  left, 
   *  right, 
   *  bottom, 
   *  translateX, 
   *  translateY, 
   *  type, 
   *  width
   * }
   */
  getMouseState = ({ e, modalRef, styleParams, minW, minH }) => {
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
