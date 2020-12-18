import * as services from './services';

import { message } from '@utils';
import { APP_CODE } from '@config/consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 创建字典
 *
 * @param {Object} action.body 修改内容
 * @return {void 0}
 */
const getArticles = function * ({ body }) {
  const { change } = yield call(services.createDatasetsfroms, {
    body: [body],
    spin: APP_CODE.READER,
  });

  const currentDatasetsfroms = yield select(
    state => Object.values(state.datasetsfrom).reduce((total, ele) => ([
      ... total,
      ... ele,
    ]), [])
  );

  yield put({
    type: 'datasetsfrom/setDatasetsfroms',
    datasetsfroms: [... currentDatasetsfroms, ... change],
  });

  message({
    placement: 'bottomRight',
    message: '字典创建成功!',
    code: APP_CODE.READER,
  });
};

// 导出
export default function * () {
  yield takeEvery('reader/getArticles', getArticles);

}
