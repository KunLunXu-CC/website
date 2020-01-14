import apps from '@app';
import React from 'react';
import _ from 'lodash';
import scss from './index.module.scss';

import { Window } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const opens = useSelector(state => _.get(state, 'app.opens'));

  const onClose = app => {
    dispatch({ type: 'app/onClose', app });
  };

  const onMin = app => {
    dispatch({ type: 'app/onMin', app });
  };

  const onMax = app => {
    dispatch({ type: 'app/onMax', app });
  };

  const onMouseDown = app => {
    dispatch({ type: 'app/onMouseDown', app });
  };

  return { opens, onClose, onMin, onMax, onMouseDown };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss['app-block']}>
      {state.opens.map(v => {
        const { code, isMin } = v;
        const { component: Component, modalProps } = apps[code];
        return (
          <Window
            key={code}
            isMin={isMin}
            onMin={state.onMin.bind(null, v)}
            onMax={state.onMax.bind(null, v)}
            onClose={state.onClose.bind(null, v)}
            onMouseDown={state.onMouseDown.bind(null, v)}
            minParams={{ width: 0, height: 0, offsetX: 0, offsetY: 0 }}
            {...modalProps}
          >
            <Component/>
          </Window>
        );
      })}
    </div>
  );
};
