import * as services from './services';
import { take, put,call } from 'redux-saga/effects';

/**
 * redux-saga effects
 * 1. 默认初始化就会执行
 * 2. 请求数据
 * 3. 转发 action
 */
export function * getPhotos() {
  // yield take('global/getPhotos');
  const photos = yield call(services.getPhotos);
  yield put({
    type: 'global/getPhotos',
    payload: photos,
  });
};
