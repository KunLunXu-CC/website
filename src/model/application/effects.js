import * as services from './services';
import { take, put,call } from 'redux-saga/effects';
import { computed } from 'mobx';
import dockConfig from '@config/dock';

/**
 * redux-saga effects
 * 1. 默认初始化就会执行
 * 2. 请求数据
 * 3. 转发 action
 */
export function * setDocksWithAuth(action) {
  // yield take('app/setDocks');
  // console.log('----->>> args', action);
  // const photos = yield call(services.getPhotos);
  // yield put({
  //   type: 'global/getPhotos',
  //   payload: photos,
  // });
};
