import * as services from './services';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 获取图片
 * 1. 请求数据
 * 2. 转发 action
 */
const getPhotos = function * ({ search }) {
  const params = {
    ... yield select(state => _.get(state, 'album.search')),
    ... search,
  };

  const photos = yield call(services.getPhotos, {
    search: {
      sourceFileName: params.sourceFileName,
      type: params.type === 'all' ? void 0 : Number(params.type),
    },
  });

  yield put({
    type: 'album/setPhotos',
    photos,
  });
};

/**
 * 图片上传
 * 1. 上传文件
 * 2. 重新查询数据
 */
const upload = function * () {
  const { type, files } = yield select(state => (
    _.get(state, 'album.upload')
  ));
  yield call(services.uploadPhotos, { type, files });
  yield call(getPhotos, { search: { type, files } });
};

/**
 * 删除图片
 * 1. 上传文件
 * 2. 重新查询数据
 */
const removePhotos = function * ({ id }) {
  const { sourceFileName, type } = yield select(
    state => _.get(state, 'album.search')
  );
  const conds = { id };
  const photos = yield call(services.removePhotos, {
    conds,
    search: {
      sourceFileName,
      type: type === 'all' ? void 0 : Number(type),
    },
  });
  yield put({
    type: 'album/setPhotos',
    photos,
  });
};

// 导出
export default function * () {
  yield takeEvery('album/removePhotos', removePhotos);
  yield takeEvery('album/getPhotos', getPhotos);
  yield takeEvery('album/upload', upload);
}
