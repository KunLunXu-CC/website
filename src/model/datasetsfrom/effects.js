import * as services from './services';

import { put, call } from 'redux-saga/effects';

/**
 * 获取字典
 *
 * @return {void 0}
 */
const getDatasetsfroms = function * () {
  const { list: datasetsfroms } = yield call(services.getDatasetsfroms, {
    search: {},
  });

  yield put({
    datasetsfroms,
    type: 'datasetsfrom/setDatasetsfroms',
  });
};

// 导出
export default function * () {
  yield getDatasetsfroms();
}
