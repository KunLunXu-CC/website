import _ from 'lodash';
import apps from '@app';
import scss from './index.module.scss';

import { actions } from '@store';
import { useCallback } from 'react';
import { Window } from '@kunlunxu/brick';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const opens = useSelector((state) => state.app?.opens);

  const onClose = useCallback((app) => {
    dispatch(actions.app.close(app));
  }, [dispatch]);

  const onMin = useCallback((app) => {
    dispatch(actions.app.minimize(app));
  }, [dispatch]);

  const onMax = useCallback((app) => {
    dispatch(actions.app.maximize(app));
  }, [dispatch]);

  const onMouseDown = useCallback((app) => {
    if (_.last(opens)?.code === app.code) {
      return false;
    }

    dispatch(actions.app.stick(app));
  }, [dispatch, opens]);

  return { opens, onClose, onMin, onMax, onMouseDown };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss['app-block']}>
      {state.opens.map((app) => {
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
            <Component />
          </Window>
        );
      })}
    </div>
  );
};
