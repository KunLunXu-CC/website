import * as services from './services';

import { message } from '@utils';
import { SPIN_CODE, MESSAGE_CODE } from '@config/consts';
import { put, call, takeEvery } from 'redux-saga/effects';

/**
 * 获取日记
 *
 * @return {void 0}
 */
const getDiaries = function * ({ date: name }) {
  const diaries = yield call(services.getDiaries, {
    search: { name },
    spin: SPIN_CODE.APP_DIARY,
  });

  yield put({
    type: 'diary/setDiaries',
    diaries,
  });
};

/**
 * 创建日记
 *
 * @param {Object} action.body 修改内容
 * @return {void 0}
 */
const createDiarie = function * ({ body }) {
  const diaries = yield call(services.createDiaries, {
    search: {},
    body: [body],
    spin: SPIN_CODE.APP_DIARY,
  });

  yield put({
    type: 'diary/setDiaries',
    diaries,
  });

  message({
    code: MESSAGE_CODE.APP_DIARY,
    placement: 'bottomRight',
    message: '日记创建成功!',
  });
};

/**
 * 修改日记
 *
 * @param {String} action.id 日记 ID
 * @param {Object} action.body 修改内容
 * @return {void 0}
 */
const updateDiaries = function * ({ id, body }) {
  const diaries = yield call(services.updateDiaries, {
    body,
    search: {},
    conds: { id },
    spin: SPIN_CODE.APP_DIARY,
  });

  yield put({
    type: 'diary/setDiaries',
    diaries,
  });

  message({
    code: MESSAGE_CODE.APP_DIARY,
    placement: 'bottomRight',
    message: '日记编辑成功!',
  });
};

// 导出
export default function * () {
  yield takeEvery('diary/getDiaries', getDiaries);
  yield takeEvery('diary/createDiarie', createDiarie);
  yield takeEvery('diary/updateDiaries', updateDiaries);
}
