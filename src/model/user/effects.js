import _ from 'lodash';
import * as services from './services';
import { put, call, takeEvery } from 'redux-saga/effects';

const login = function * ({ account, password } = {}) {
  const user = yield call(services.login, { account, password });
  yield put({
    payload: user,
    type: 'user/setUser',
  });
  yield put({
    type: 'app/setDocks',
    auth: _.get(user, 'role.auth') || [],
  });
};

/**
 * redux-saga effects
 * 1. 默认初始化就会执行
 * 2. 请求数据
 * 3. 转发 action
 */
const init = function * () {
  yield login();
};

// 登录
export const takeEveries = function * () {
  yield init();
  yield takeEvery('user/login', login);
};

export const place = function * () { };
