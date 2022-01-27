import * as services from './services';
import { put, call, takeEvery } from 'redux-saga/effects';

/**
 * 登录
 * 1. 登录
 * 2. 触发 action 设置用户
 * 3. 触发 action 设置 docks
 * @param {String} params.account  账号
 * @param {String} params.password 密码
 * @return {undefined}
 */
const login = function * ({ account, password } = {}) {
  const user = yield call(services.login, { account, password });
  yield put({
    payload: user,
    type: 'user/setUser',
  });
  yield put({
    type: 'app/setDocks',
    auth: user?.role?.auth ?? [],
  });
};

/**
 * 初始化数据: 在初始初始化 redux 就会被执行
 * @return {undefined}
 */
const init = function * () {
  yield login();
};

// 导出
export default function * () {
  yield init();
  yield takeEvery('user/login', login);
}
