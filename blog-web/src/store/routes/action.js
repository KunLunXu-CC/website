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
    payload: { ...app, match, url, status: APP_STATUS.SHOW.VALUE }
  };
}

export const close = ({route}) => ({
  type: ACTION_TYPE.CLOSE_APP,
  payload: { ...route }
});
