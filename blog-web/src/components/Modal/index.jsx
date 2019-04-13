// 要求父节点无 padding margin border
import React, { 
  memo,
  useRef, 
  useMemo, 
  useState, 
  useEffect, 
  useCallback, 
} from 'react';
import _ from 'lodash';
import helper from './helper';
import css from './index.module.scss';

// 默认状态值
const defaultState = {
  isMouseDown: false,
  styleParams: {
    width: 100, 
    height: 100, 
    cursor: 'auto', 
    translateX: 10, 
    translateY: 10,
  }
};

const useStateHook = (props) => {
  const [styleParams, setStyleParams] = useState(defaultState.styleParams);
  const [mouseDownState, setMouseDownState] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    console.log('------------------ 刷新 ------------------------');
  });

  useEffect(() => {
    window.onmousemove = onMouseMove;
    window.onmousedown = onMouseDown;
    window.onmouseup = onMouseUp;
  }); 

  /**
   * 计算（合并设置）styleParams
   * @param {Object} reset 
   */
  const resetStyleParams = (reset) => {
    reset = {...styleParams, ...reset};
    if (_.isEqual(reset, styleParams)){ return false;}
    setStyleParams(reset);
  }

  /**
   * 处理移动函数： 执行处理函数并设置 styleParams
   * @param {Object} e 事件对象
   */
  const onMove = (e) => {
    if (!mouseDownState || !mouseDownState.handler){return false;}
    const reset = mouseDownState.handler({ e, mouseDownState, modalRef });
    resetStyleParams(reset);
  }

  /**
   * 鼠标移动事件： 1. 获取鼠标状态并设置 styleParams 2. 执行移动函数
   * @param {Object} e 事件对象
   */
  const onMouseMove = (e) => {
    const state = helper.getMouseState({ e, modalRef, styleParams });
    resetStyleParams({cursor: state.cursor});
    onMove(e);
  }

  /**
   * 鼠标按下事件： 1. 取消默认行为和冒泡 2. 获取鼠标状态并设置 mouseDownState
   * @param {Object} e 事件对象
   */
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const state = helper.getMouseState({ e, modalRef, styleParams });
    if (!state.type){return false;}
    setMouseDownState(state);
  }

  /**
   * 鼠标弹起事件： 1. 移除 mouseDownState
   * @param {Object} e 事件对象
   */
  const onMouseUp = (e) => {
    setMouseDownState(null);
  }

  const style = useMemo(() => ({
    cursor: styleParams.cursor,
    width: `${styleParams.width}px`,
    height: `${styleParams.height}px`,
    transform: `translate(${styleParams.translateX}px, ${styleParams.translateY}px)`,
  
    background: 'blue',
  }), [styleParams]);

  return { style, modalRef }
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <div 
      style={state.style} 
      ref={state.modalRef}
      className={css['modal']} 
    >
      modal
    </div>
  );
};
