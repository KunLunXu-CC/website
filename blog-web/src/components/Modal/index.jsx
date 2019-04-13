// 要求父节点无 padding margin border
import React, { useCallback, useState, useEffect, useMemo, useRef, memo } from 'react';
import _ from 'lodash';
import helper from './helper';
import css from './index.module.scss';

// 默认状态值
const defaultState = {
  isMouseDown: false,
  styleParams: {
    cursor: 'auto', 
    width: 100, height: 100, 
    translateX: 10, translateY: 10,
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

  const resetStyleParams = (reset) => {
    reset = {...styleParams, ...reset};
    if (_.isEqual(reset, styleParams)){ return false;}
    setStyleParams(reset);
  }

  const onMove = (e) => {
    if (!mouseDownState || !mouseDownState.handler){return false;}
    const reset = mouseDownState.handler({ e, mouseDownState, modalRef });
    resetStyleParams(reset);
  }

  const onMouseMove = (e) => {
    // 1. 获取鼠标在 modal 边界状态， 并设置 modal.style.cursor
    const state = helper.getMouseState({ e, modalRef, styleParams });
    resetStyleParams({cursor: state.cursor});
    // 2. 处理函数（鼠标按下） ？ 执行处理函数 ： 不做处理
    onMove(e);
  }

  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // 1. 是否触碰到 modal 边界 ？ 设置鼠标按下状态 ： 否则不做处理
    const state = helper.getMouseState({ e, modalRef, styleParams });
    if (!state.type){return false;}
    setMouseDownState(state);
  }

  const onMouseUp = (e) => {
    // 1. 清除所有可以清除的： modal cursor 、处理函数 = null
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
