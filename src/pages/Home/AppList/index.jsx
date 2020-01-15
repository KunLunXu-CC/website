import React, {
  useCallback,
} from 'react';
import _ from 'lodash';
import apps from '@app';
import scss from './index.module.scss';

import { Window } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const opens = useSelector(state => _.get(state, 'app.opens'));

  const onClose = useCallback(app => {
    dispatch({ type: 'app/onClose', app });
  }, []);

  const onMin = useCallback(app => {
    dispatch({ type: 'app/onMin', app });
  }, []);

  const onMax = useCallback(app => {
    dispatch({ type: 'app/onMax', app });
  }, []);

  const onMouseDown = useCallback(app => {
    dispatch({ type: 'app/onMouseDown', app });
  }, []);

  return { opens, onClose, onMin, onMax, onMouseDown };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss['app-block']}>
      {state.opens.map(app => {
        const { component: Component, modalProps } = apps[app.code];
        return (
          <Window
            key={app.code}
            isMin={app.isMin}
            onMin={state.onMin.bind(null, app)}
            onMax={state.onMax.bind(null, app)}
            onClose={state.onClose.bind(null, app)}
            onMouseDown={state.onMouseDown.bind(null, app)}
            minParams={{ width: 0, height: 0, offsetX: 0, offsetY: 0 }}
            {...modalProps}>
            <Component/>
          </Window>
        );
      })}
    </div>
  );
};
