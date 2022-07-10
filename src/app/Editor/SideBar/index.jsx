import React from 'react';
import Resource from './Resource';
import classNames from 'classnames';
import scss from './index.module.scss';
import { VariableContainer } from '@kunlunxu/brick';
import { useDispatch, useSelector } from 'react-redux';

const SIDE_MIN_WIDTH = 4;  // 菜单最小宽度

const useStateHook = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => ({
    collapsed: state.editor.side.collapsed,
  }));

  // 顶层 className
  const className = React.useMemo(() => classNames(
    scss.side,
    { [scss.collapsed]: collapsed },
  ), [collapsed]);

  // 尺寸变化
  const onResize = React.useCallback(({ width }) => dispatch({
    type: 'editor/setSide',
    side: { collapsed: SIDE_MIN_WIDTH === width },
  }), []);

  return { className, onResize };
};

export default () => {
  const state = useStateHook();
  return (
    <VariableContainer
      layout
      margin={{ right: '20%' }}
      operationList={['right']}
      onResize={state.onResize}
      style={{ height: '100%' }}
      className={state.className}
      constraintSize={{ width: SIDE_MIN_WIDTH }}>
      <Resource />
    </VariableContainer >
  );
};
