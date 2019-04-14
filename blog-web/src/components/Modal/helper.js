import _ from 'lodash';

class Helper {
  constructor(){
    // modal 可缩小的默认最小宽高
    this.MIN_H = 250;
    this.MIN_W = 500;
    // 容错(边界、 拖拽)
    this.FT_BORDER = 2;
    this.FT_DRAG = 30;
  }

  /**
   * 设置（计算）样式：
   * @param {Object} styleParams 样式参数
   * @return {Object} jsx 样式对象 
   */
  getStyle = ({ styleParams }) => {
    const width = _.isNumber(styleParams.width) ? `${styleParams.width}px` : styleParams.width; 
    const height = _.isNumber(styleParams.height) ? `${styleParams.height}px` : styleParams.height; 
    return {
      width,
      height,
      cursor: styleParams.cursor,
      transform: `translate(${styleParams.translateX}px, ${styleParams.translateY}px)`,
    };
  }

  /**
   * 为父容器设置 cursor
   * @param {Object} modalRef   modal ref
   * @param {String} cursor     curosor 样式
   */
  setParentCursor = ({modalRef, cursor}) => {
    const node = modalRef.current.parentNode;
    node.style.cursor = cursor
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
   * @param {Number} minW             modal 允许缩小的最小宽度
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
    (width + offset) < minW && (offset += minW - (width + offset));
    return { 
      width: width + offset,
      translateX: translateX - offset,
    };
  }

  /**
   * modal 右边框移动处理函数
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minW             modal 允许缩小的最小宽度
   * @return {Object} { width } styleParams 用于计算样式
   */
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

  /**
   * modal 上边框移动处理函数
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @return {Object} { height, translateY } styleParams 用于计算样式
   */
  hTop = ({ e, mouseDownState, modalRef, minH = this.MIN_H }) => {
    let { height, top, translateY } = mouseDownState;
    const { clientY } = this.formatClient({ 
      modalRef,
      clientX: e.clientX, 
      clientY: e.clientY, 
    });
    let offset = top - clientY;
    (height + offset) < minH && (offset += minH - (height + offset));
    return {
      height: height + offset,
      translateY: translateY - offset,
    };
  }

  /**
   * modal 下边框移动处理函数
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @return {Object} { height } styleParams 用于计算样式
   */
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

  /**
   * modal 左上角移动处理函数： 合并 hLeft 和 hTop 返回值
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @param {Number} minW             modal 允许缩小的最小宽度
   * @return {Object} { ... } styleParams 用于计算样式
   */
  hLeftTop = (...args) => ({ ...this.hLeft(...args), ...this.hTop(...args)});

  /**
   * modal 右上角移动处理函数： 合并 hRight 和 hTop 返回值
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @param {Number} minW             modal 允许缩小的最小宽度
   * @return {Object} { ... } styleParams 用于计算样式
   */
  hRightTop = (...args) => ({ ...this.hRight(...args), ...this.hTop(...args)});

  /**
   * modal 左下角移动处理函数： 合并 hLeft 和 hBottom 返回值
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @param {Number} minW             modal 允许缩小的最小宽度
   * @return {Object} { ... } styleParams 用于计算样式
   */
  hLeftBottom =(...args) => ({ ...this.hLeft(...args), ...this.hBottom(...args)});

  /**
   * modal 右下角移动处理函数： 合并 hRight 和 hBottom 返回值
   * @param {Object} e                移动事件对象
   * @param {Object} mouseDownState   鼠标按下时存储的状态
   * @param {Object} modalRef         modal ref
   * @param {Number} minH             modal 允许缩小的最小高度
   * @param {Number} minW             modal 允许缩小的最小宽度
   * @return {Object} { ... } styleParams 用于计算样式
   */
  hRightBottom = (...args) => ({ ...this.hRight(...args), ...this.hBottom(...args)});

  /**
   * 合并鼠标状态： 根据鼠标的状态获取自定义参数并合并状态后返回
   * @param {Number} state.clientX      鼠标事件 clientX
   * @param {Number} state.clientY      鼠标事件 clientY
   * 
   * @param {Number} state.left         modal rect left
   * @param {Number} state.top          modal rect top
   * @param {Number} state.right        modal rect right
   * @param {Number} state.bottom       modal rect bottom
   * 
   * @param {String} state.cursor       modal styleParams cursor
   * @param {Number} state.width        modal styleParams width
   * @param {Number} state.height       modal styleParams height
   * @param {Number} state.translateX   modal styleParams translateX
   * @param {Number} state.translateY   modal styleParams translateY
   * 
   * @return {Object} {...state, conds, cursor, handler, type} 状态参数合并自定义参数 
   */
  mergeMouseState = (state) => {
    // 判断鼠标是否位于 modal 宽高范围内
    const onWidth = state.left - state.clientX < this.FT_BORDER && state.clientX - state.right < this.FT_BORDER;
    const onHeight = state.top - state.clientY < this.FT_BORDER && state.clientY - state.bottom < this.FT_BORDER;

    // 判断鼠标是否落在 modal 边界
    const onLeft = Math.abs(state.clientX - state.left) <= this.FT_BORDER  && onHeight;
    const onRight = Math.abs(state.clientX - state.right) <= this.FT_BORDER && onHeight;
    const onBottom = Math.abs(state.clientY - state.bottom) <= this.FT_BORDER && onWidth;
    const onTop = Math.abs(state.clientY - state.top) <= this.FT_BORDER && onWidth;

    // 判断鼠标 y 轴是否在可 modal 可拖拽范围内， 并且在宽度范围内
    const onDrag = state.clientY - state.top > 0 && state.clientY - state.top < this.FT_DRAG && onWidth;

    // 配置表： conds 鼠标所处位置限制条件、cursor 鼠标手势样式、handler 处理函数、type 类型你也可以来当做唯一值（name）
    const settingList = [{
      type: 'left',
      cursor: 'w-resize',
      handler: this.hLeft,
      conds:  onLeft && !onTop && !onBottom,
    }, {
      type: 'right',
      cursor: 'e-resize',
      handler: this.hRight,
      conds:  onRight && !onTop && !onBottom,
    }, {
      type: 'top',
      cursor: 'n-resize',
      handler: this.hTop,
      conds:  onTop && !onLeft && !onRight,
    }, {
      type: 'bottom',
      cursor: 's-resize',
      handler: this.hBottom,
      conds:  onBottom && !onLeft && !onRight,
    }, {
      type: 'leftTop',
      cursor: 'nw-resize',
      handler: this.hLeftTop,
      conds:  onLeft && onTop,
    }, {
      type: 'rightTop',
      cursor: 'ne-resize',
      handler: this.hRightTop,
      conds:  onRight && onTop,
    }, {
      type: 'leftBottom',
      cursor: 'sw-resize',
      handler: this.hLeftBottom,
      conds:  onLeft && onBottom,
    }, {
      type: 'rightBottom',
      cursor: 'se-resize',
      handler: this.hRightBottom,
      conds:  onRight && onBottom,
    }, {
      type: 'drag',
      conds:  onDrag,
      cursor: 'pointer',
      handler: this.hDrag,
    }, {
      type: null,
      conds:  true,
      handler: null,
      cursor: 'auto',
    }];
    const filter = settingList.filter(v => v.conds)[0];
    return { ...state, ...filter };
  }

  /**
   * 获取鼠标状态
   * @param {Object} e              鼠标事件对象
   * @param {Object} modalRef       modal ref
   * @param {Object} styleParams    modal 样式参数
   * @return {Object} {...} mergeMouseState 返回值
   * --- 自定义参数（根据鼠标所处位置判定）
   * - type
   * - conds
   * - cursor
   * - handler
   * --- 鼠标事件对象 clientX clientY
   * - clientX
   * - clientY
   * --- modal rect
   * - top
   * - left
   * - right
   * - bottom
   * --- modal 样式计算参数
   * - width
   * - height
   * - translateX
   * - translateY
   */
  getMouseState = ({ e, modalRef, styleParams }) => {
    const  rect = modalRef.current.getBoundingClientRect();
    const { left, top, right, bottom } = rect;
    const { clientX, clientY } = e;
    return this.mergeMouseState({ 
      clientX, clientY, left, top, right, bottom, ...styleParams
    });
  }
 
}

export default new Helper(); 
