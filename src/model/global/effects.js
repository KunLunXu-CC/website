import * as services from './services';
import { put, call } from 'redux-saga/effects';

/**
 * redux-saga effects
 * 1. 默认初始化就会执行
 * 2. 请求数据
 * 3. 转发 action
 */
export const getPhotos = function * getPhotos () {
  const photos = yield call(services.getPhotos);
  yield put({
    type: 'global/getPhotos',
    payload: photos,
  });
};

export const place = function * place () {

};
