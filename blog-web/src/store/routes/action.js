import * as ACTION_TYPE from './actionType';
import { APP_STATUS } from '@config/consts';
import { matchPath } from 'react-router-dom';
import apps from '@app/index';

export const open = (url) => {
  let match = void 0;
  const app = apps.find( v => {
    match = matchPath(url, {
      path: v.path,
      exact: v.exact,
      strict: false,
    })
    return match;
  });

  return {
    type: ACTION_TYPE.OPEN_APP,
    payload: { 
      url, 
      match, 
      ...app,
      min: null, 
      max: null,
    }
  };
}

export const close = ({ route }) => ({
  type: ACTION_TYPE.CLOSE_APP,
  payload: { ...route }
});

// 最大化（切换） 当前 styleParams
export const maximize = ({ route }) => ({
  type: ACTION_TYPE.APP_MAX,
  payload: { ...route, max: !route.max }
});

// 最小化（切换） 当前 styleParams
export const minimize = ({ route }) => ({
  type: ACTION_TYPE.APP_MIN,
  payload: { ...route, min: !route.min }
});
