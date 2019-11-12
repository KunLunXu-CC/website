import _ from 'lodash';
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { Icon } from 'qyrc';
import classNames from 'classnames';
import scss from './index.module.scss';

const FT = 20;

const useStateHook = props => {
  const [show, setShow] = useState(false);
  const dockRef = useRef();

  useEffect(() => {
    if (!dockRef.current) {
      return false;
    }

    // 1. 重置 show 状态
    const resetShow = value => {
      if (value === show) {
        return false;
      }

      setShow(value);
    };

    // 2. 鼠标移动事件
    const onMouseMove = e => {
      const { clientHeight } = document.documentElement;
      const { top } = dockRef.current.getBoundingClientRect();
      const reset = [
        e.clientY > top,
        clientHeight - e.clientY < FT,
      ].includes(true);
      resetShow(reset);
    };

    // 3. 鼠标移除事件
    const onMouseLeave = () => {
      resetShow(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [show]);

  // 计算 dock className
  const dockClassName = useMemo(() => (
    scss[`dock-${show ? 'show' : 'hidden'}`]
  ), [show]);

  // 点击事件
  const onClick = dock => {
    _.isFunction(props.onClick) && props.onClick(dock);
  };

  return { dockClassName, dockRef, onClick };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div
      ref={state.dockRef}
      className={classNames(state.dockClassName, scss.dock)} >
      <div className={scss['dock-body']}>
        {props.dataSource.map(v => (
          <div
            key={v.code}
            className={scss['dock-app']}
            onClick={state.onClick.bind(null, v)}>
            <Icon type={v.icon} style={{ fontSize: '50px' }}/>
          </div>
        ))}
      </div>
    </div>
  );
};
