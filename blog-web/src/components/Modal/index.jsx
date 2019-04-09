import React, { useCallback, useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import {reckonCursor, reckonStyleParams, reckonOffset, reckonStyle} from './helper';
import css from './index.module.scss';

// 默认状态值
const defaultState = {
  isMouseDown: false,
  styleParams: {
    width: 100, 
    height: 100, 
    left: 10, 
    top: 10,
    cursor: 'auto', 
  }
};

const useStateHook = (props) => {
  const [styleParams, setStyleParams] = useState(defaultState.styleParams);
  const [isMouseDown, setIsMouseDown] = useState(defaultState.isMouseDown);

  useEffect(() => {
    window.onmousemove = onDrag;
    window.onmousedown = onMouseDown;
    window.onmouseup = onMouseUp;
  }); 

  const style = useMemo(() => (reckonStyle({
    ...styleParams
  })), [styleParams]);

  // 拖动
  const onDrag = useCallback((e) => {
    if (styleParams.cursor === defaultState.styleParams.cursor || !isMouseDown){ return false; }
    const reset = reckonStyleParams({
      ...styleParams, 
      movex: e.movementX, 
      movey: e.movementY,
    })[styleParams.cursor];
    console.log(reset);
    setStyleParams({ ...styleParams, ...reset });
  }, [styleParams, isMouseDown]);

  // 设置 cursor
  const setCursor = useCallback((e) => {
    const current = styleParams.cursor;
    if (current !== defaultState.styleParams.cursor && isMouseDown){ return false; }
    const offset = reckonOffset({e, ...styleParams});
    const cursor = reckonCursor({ ...offset, current });
    cursor && setStyleParams({ ...styleParams, cursor });
  }, [styleParams, isMouseDown]);

  // 鼠标移动事件
  const onMouseMove = (e) => {
    setCursor(e);
  }

  // 鼠标按下
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMouseDown(true);
  }

  // 鼠标弹起来
  const onMouseUp = (e) => {
    setIsMouseDown(false);
  }

  return { style, onMouseMove }
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <div 
      style={state.style} 
      className={css['modal']} 
      onMouseMove={state.onMouseMove}
    >
      modal
    </div>
  );
};
