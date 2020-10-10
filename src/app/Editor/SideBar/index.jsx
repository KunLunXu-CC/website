import React from 'react';
import Resource from './Resource';
import scss from './index.module.scss';

import { VariableContainer } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const MENU_MIN_WIDTH = 4;  // 菜单最小宽度

const useStateHook = () => {
  const dispatch = useDispatch();
  const { side } = useSelector(state => ({
    side: state.editor.side,
  }));

  // 尺寸变化
  const onResize = React.useCallback(({ width }) => dispatch({
    type: 'editor/setSide',
    side: { collapsed: MENU_MIN_WIDTH === width },
  }), []);

  return { side, onResize };
};

export default () => {
  const state = useStateHook();
  return (
    <VariableContainer
      className={scss.side}
      margin={{ right: '20%' }}
      operationList={['right']}
      onResize={state.onResize}
      style={{ height: '100%' }}
      constraintSize={{ width: MENU_MIN_WIDTH }}>
      {!state.side.collapsed ?
        <div className={scss.body}>
          <Resource/>
        </div> : null
      }
    </VariableContainer >
  );
};
