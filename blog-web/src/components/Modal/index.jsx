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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontIcon } from '@components';
import { close } from '@store/routes/action';

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

// modal 状态
const MODAL_STATUS = {
  CLOSE: 'close',
  NORMAL: 'normal',
  MINIMIZE: 'minimize',
  MAXIMIZE: 'maximize',
};

const useStateHook = (props) => {
  const [styleParams, setStyleParams] = useState(defaultState.styleParams);
  const [mouseDownState, setMouseDownState] = useState(null);
  const histories = useMemo(() => ({}), []);
  const modalRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    }
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
    const route = props.route;
    props.close && props.close({route});
  }

  /**
   * 缩小 modal
   */
  const onMinimize = () => {
    
    if (!histories[MODAL_STATUS.MINIMIZE]){
      histories[MODAL_STATUS.MINIMIZE] = styleParams;
      resetStyleParams({
        width: 100,
        height: 100,
        translateX: '50vw',
        translateY: '80vh',
      });
    } else {
      const reset = {...histories[MODAL_STATUS.MINIMIZE]};
      histories[MODAL_STATUS.MINIMIZE] = null;
      resetStyleParams(reset);
    };
  }

  /**
   * 切换最大（还原）
   */
  const onMaximize = () => {
    if (!histories[MODAL_STATUS.MAXIMIZE]){
      histories[MODAL_STATUS.MAXIMIZE] = styleParams;
      resetStyleParams({
        width: '100%',
        height: '100%',
        translateX: 0,
        translateY: 0,
      });
    } else {
      const reset = {...histories[MODAL_STATUS.MAXIMIZE]};
      histories[MODAL_STATUS.MAXIMIZE] = null;
      resetStyleParams(reset);
    };
  }

  const style = useMemo(helper.getStyle.bind(null, {
    styleParams
  }), [styleParams]);

  return { style, modalRef, onClose, onMinimize, onMaximize }
}

const Modal = (props) => {
  const state = useStateHook(props);
  return (
    <div style={state.style}  ref={state.modalRef} className={css['modal']}>
      <div className={css['modal-content']}>
        {/* 工具栏 */}
        <div className={css['modal-tool']}>
          <div className={css['close']} onClick={state.onClose}>
            <FontIcon icon="icon-guanbi6-copy" />
          </div>
          <div className={css['shrink']} onClick={state.onMinimize}>
            <FontIcon icon="icon-suoxiao" />
          </div>
          <div className={css['zoom']} onClick={state.onMaximize}>
            <FontIcon icon="icon-fangda1" />
          </div>
        </div>
        {/* 内容 */}
        {props.children}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  close: bindActionCreators(close, dispatch)
});
export default connect(null, mapDispatchToProps)(Modal);