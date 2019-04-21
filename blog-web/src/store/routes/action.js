import * as ACTION_TYPE from './actionType';
import { matchPath } from 'react-router-dom';
import apps from '@app/index';

export const open = (url) => {
  console.log(url);

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
    payload: { ...app, match, url }
  };
}

export const close = ({}) => {

}
