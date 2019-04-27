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
import { FontIcon } from '@components';
import { bindActionCreators } from 'redux';
import { close, maximize, minimize } from '@store/routes/action';

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

  // 计算（合并设置）styleParams
  const resetStyleParams = (reset) => {
    reset = {...styleParams, ...reset};
    if (_.isEqual(reset, styleParams)){ return false;}
    setStyleParams(reset);
  }

  // 处理移动函数： 执行处理函数并设置 styleParams
  const onMove = (e) => {
    if (!mouseDownState || !mouseDownState.handler){return false;}
    const reset = mouseDownState.handler({ e, mouseDownState, modalRef });
    resetStyleParams(reset);
  }

  // 鼠标移动事件： 1. 获取鼠标状态并设置 styleParams 2. 执行移动函数
  const onMouseMove = (e) => {
    const state = helper.getMouseState({ e, modalRef, styleParams });
    resetStyleParams({cursor: state.cursor});
    onMove(e);
  }

  // 鼠标按下事件： 1. 取消默认行为和冒泡 2. 为父级容器设置 cursor 样式 3. 获取鼠标状态并设置 mouseDownState
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const state = helper.getMouseState({ e, modalRef, styleParams });
    if (!state.type){return false;}
    helper.setParentCursor({ modalRef, cursor:  state.cursor});
    setMouseDownState(state);
  }

  // 鼠标弹起事件： 1. 重置父级 cursor 样式 2. 移除 mouseDownState
  const onMouseUp = (e) => {
    helper.setParentCursor({ modalRef, cursor:  'auto'});
    setMouseDownState(null);
  }

  // 关闭 modal
  const onClose = (e) => {
    props.close && props.close({url: props.route.url});
  }

  // 最小化（切换）
  const onMinimize = () => {
    props.minimize({ route: props.route });
  }

  // 最大化（切换）
  const onMaximize = () => {
    props.maximize({ route: props.route });
  }

  // 计算样式参数： 最小化样式 || 最大化样式 || 正常样式
  const style = useMemo(() => {
    const params = props.route.min || props.route.max || styleParams;
    return helper.getStyle({ styleParams: params });
  }, [styleParams, props.route]);

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
  close: bindActionCreators(close, dispatch),
  maximize: bindActionCreators(maximize, dispatch),
  minimize: bindActionCreators(minimize, dispatch),
});
export default connect(null, mapDispatchToProps)(Modal);
