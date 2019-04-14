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
import { FontIcon } from '@components';

// 默认状态值
const defaultState = {
  isMouseDown: false,
  styleParams: {
    width: 500, 
    height: 300, 
    cursor: 'auto', 
    translateX: 10, 
    translateY: 10,
  }
};

const useStateHook = (props) => {
  const [styleParams, setStyleParams] = useState(defaultState.styleParams);
  const [oldStyleParams, setOldStyleParams] = useState({});
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
   * 鼠标按下事件： 1. 取消默认行为和冒泡 2. 为父级容器设置 cursor 样式 3. 获取鼠标状态并设置 mouseDownState
   * @param {Object} e 事件对象
   */
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const state = helper.getMouseState({ e, modalRef, styleParams });
    if (!state.type){return false;}
    helper.setParentCursor({ modalRef, cursor:  state.cursor});
    setMouseDownState(state);
  }

  /**
   * 鼠标弹起事件： 1. 重置父级 cursor 样式 2. 移除 mouseDownState
   * @param {Object} e 事件对象
   */
  const onMouseUp = (e) => {
    helper.setParentCursor({ modalRef, cursor:  'auto'});
    setMouseDownState(null);
  }

  /**
   * 关闭 modal
   */
  const onClose = (e) => {
    
    console.log('关闭');
  }

  /**
   * 缩小 modal
   */
  const onShrink = () => {
    console.log('缩小');
  }

  /**
   * 切换最大（还原）
   */
  const onZoom = () => {
    if (_.isEmpty(oldStyleParams)){
      setOldStyleParams(styleParams);
      resetStyleParams({
        width: '100%',
        height: '100%',
        translateX: 0,
        translateY: 0,
      });
    } else {
      setOldStyleParams({});
      resetStyleParams(oldStyleParams);
    };
  }

  const style = useMemo(helper.getStyle.bind(null, {
    styleParams
  }), [styleParams]);

  return { style, modalRef, onClose, onShrink, onZoom }
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <div style={state.style}  ref={state.modalRef} className={css['modal']}>
      <div className={css['modal-content']}>
        {/* 工具栏 */}
        <div className={css['modal-tool']}>
          <div className={css['close']} onClick={state.onClose}>
            <FontIcon icon="icon-guanbi6-copy" />
          </div>
          <div className={css['shrink']} onClick={state.onShrink}>
            <FontIcon icon="icon-suoxiao" />
          </div>
          <div className={css['zoom']} onClick={state.onZoom}>
            <FontIcon icon="icon-fangda1" />
          </div>
        </div>
      </div>

      1111111111
    </div>
  );
};
