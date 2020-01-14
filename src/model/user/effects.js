import _ from 'lodash';
import * as services from './services';
import { take, put,call } from 'redux-saga/effects';

/**
 * redux-saga effects
 * 1. 默认初始化就会执行
 * 2. 请求数据
 * 3. 转发 action
 */
export function * initUser() {
  // yield take('user/setUser');
  const user = yield call(services.login);
  yield put({
    payload: user,
    type: 'user/setUser',
  });
  yield put({
    type: 'app/setDocks',
    payload: _.get(user, 'role.auth') || [],
  });
};

// 登录
export function * login() {
  // yield take('user/login');
  // const user = yield call(services.login);
  // yield put({
  //   payload: user,
  //   type: 'user/setUser',
  // });
};
