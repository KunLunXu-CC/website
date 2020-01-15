import * as services from './services';
import { put, call } from 'redux-saga/effects';

/**
 * 获取所有图片
 * redux-saga effects
 * 1. 请求数据
 * 2. 转发 action
 */
const getPhotos = function * () {
  const photos = yield call(services.getPhotos);
  yield put({
    photos,
    type: 'global/setPhotos',
  });
};

/**
 * 初始化数据: 在初始初始化 redux 就会被执行
 * @return {undefined}
 */
const init = function * () {
  yield getPhotos();
};

// 导出
export default function * () {
  yield init();
}
