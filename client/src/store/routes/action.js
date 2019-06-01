import _ from 'lodash';
import * as ACTION_TYPE from './actionType';
import { APP_STATUS } from '@config/consts';
import { matchPath } from 'react-router-dom';
import apps from '@app/index';

/**
 * 开启 app
 * @param {String} url 路由 
 */
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

/**
 * 关闭 app
 * @param {String} url 路由 
 */
export const close = ({ url }) => ({
  type: ACTION_TYPE.CLOSE_APP,
  payload: { url }
});

/**
 * 最大化（切换）
 * @param {Object} route 当前操作 app 的 route
 */
export const maximize = ({ route }) => ({
  type: ACTION_TYPE.APP_MAX,
  payload: { ...route, max: !route.max }
});

/**
 * 最小化（切换）
 * @param {Object} route 当前操作 app 的 route
 */
export const minimize = ({ route }) => ({
  type: ACTION_TYPE.APP_MIN,
  payload: { ...route, min: !route.min }
});

/**
 * 应用切换
 * @param {String} url 应用 url， 应用唯一标识
 */
export const toggle = ({ url }) => ({
  type: ACTION_TYPE.TOGGLE_APP,
  payload: { url }
});
