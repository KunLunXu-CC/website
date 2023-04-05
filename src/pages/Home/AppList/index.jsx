import _ from 'lodash';
import apps from '@app';
import scss from './index.module.scss';

import { actions } from '@store';
import { useCallback } from 'react';
import { Window } from '@kunlunxu/brick';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const opens = useSelector((state) => state.app?.opens);

  const handleClose = useCallback((app) => {
    dispatch(actions.app.close(app));
  }, [dispatch]);

  const handleMin = useCallback((app) => {
    dispatch(actions.app.minimize(app));
  }, [dispatch]);

  const handleMax = useCallback((app) => {
    dispatch(actions.app.maximize(app));
  }, [dispatch]);

  const handleMouseDown = useCallback((app) => {
    if (_.last(opens)?.code === app.code) {
      return false;
    }

    dispatch(actions.app.stick(app));
  }, [dispatch, opens]);

  return (
    <div className={scss['app-block']}>
      {opens.map((app) => {
        const { component: Component, modalProps } = apps[app.code];
        return (
          <Window
            key={app.code}
            isMin={app.isMin}
            onMin={handleMin.bind(null, app)}
            onMax={handleMax.bind(null, app)}
            onClose={handleClose.bind(null, app)}
            onMouseDown={handleMouseDown.bind(null, app)}
            minParams={{ width: 0, height: 0, offsetX: 0, offsetY: 0 }}
            {...modalProps}>
            <Component />
          </Window>
        );
      })}
    </div>
  );
};
