import * as services from './services';

import { message } from '@utils';
import { SPIN_CODE, MESSAGE_CODE } from '@config/consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 获取日记
 *
 * @return {void 0}
 */
const getDiaries = function * ({ search }) {
  const diaries = yield call(services.getDiaries, {
    search,
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
  const { change } = yield call(services.createDiaries, {
    body: [body],
    spin: SPIN_CODE.APP_DIARY,
  });
  const currentDiaries = yield select(state => state.diary.diaries);

  yield put({
    type: 'diary/setDiaries',
    diaries: [... currentDiaries, ... change],
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
  const { change } = yield call(services.updateDiaries, {
    body,
    conds: { id },
    spin: SPIN_CODE.APP_DIARY,
  });

  const currentDiaries = yield select(state => state.diary.diaries);

  yield put({
    type: 'diary/setDiaries',
    diaries: _.uniqBy([... change, ... currentDiaries], 'id'),
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
