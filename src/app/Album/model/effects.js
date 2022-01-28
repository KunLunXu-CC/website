import * as services from './services';

import { message } from '@utils';
import { APP_CODE } from '@config/consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 获取图片
 * 1. 请求数据
 * 2. 转发 action
 */
const getPhotos = function * ({ search }) {
  const params = {
    ...yield select((state) => state.album?.search),
    ...search,
  };

  const photos = yield call(services.getPhotos, {
    spin: APP_CODE.ALBUM,
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
  const { type, searchType, files } = yield select((state) => ({
    ...state.album?.upload,
    searchType: state.album.search?.type,
  }));

  if (files.length < 1) {
    return message({
      code: APP_CODE.ALBUM,
      message: '请先添加要上传的图片!',
    });
  }

  yield call(services.uploadPhotos, {
    type,
    files,
    spin: APP_CODE.ALBUM,
  });

  message({
    code: APP_CODE.ALBUM,
    message: '上传成功!',
  });

  // 当前菜单栏为所有, 或者上传类型等于当前查询的类型
  if (searchType === 'all' || Number(type) === Number(searchType)) {
    yield call(getPhotos, { search: {} });
  }
};

/**
 * 删除图片
 * 1. 上传文件
 * 2. 重新查询数据
 */
const removePhotos = function * ({ id }) {
  const { sourceFileName, type } = yield select(
    (state) => state.album?.search,
  );
  const conds = { id };

  const photos = yield call(services.removePhotos, {
    conds,
    spin: APP_CODE.ALBUM,
    search: {
      sourceFileName,
      type: type === 'all' ? void 0 : Number(type),
    },
  });

  message({
    code: APP_CODE.ALBUM,
    message: '删除成功!',
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
