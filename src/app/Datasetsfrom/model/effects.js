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
const createDatasetsfrom = function * ({ body }) {
  const { change } = yield call(services.createDatasetsfroms, {
    body: [body],
    spin: APP_CODE.DATASETSFROM,
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
    code: APP_CODE.DATASETSFROM,
  });
};


/**
 * 更新字典
 *
 * @param {Object} action.body 修改内容
 * @return {void 0}
 */
const updateDatasetsfrom = function * ({ body, id }) {
  const { change } = yield call(services.updateDatasetsfroms, {
    body,
    conds: { id },
    spin: APP_CODE.DATASETSFROM,
  });

  const currentDatasetsfroms = yield select(
    state => Object.values(state.datasetsfrom).reduce((total, ele) => ([
      ... total,
      ... ele,
    ]), [])
  );

  yield put({
    type: 'datasetsfrom/setDatasetsfroms',
    datasetsfroms: _.uniqBy([... change, ... currentDatasetsfroms], 'id'),
  });

  message({
    message: '字典编辑成功!',
    placement: 'bottomRight',
    code: APP_CODE.DATASETSFROM,
  });
};

/**
 * 删除字典
 *
 * @param {Object} action.id 要删除的字典
 * @return {void 0}
 */
const removeDatasetsfrom = function * ({ id }) {
  const { change } = yield call(services.removeDatasetsfroms, {
    conds: { id },
    spin: APP_CODE.DATASETSFROM,
  });

  const currentDatasetsfroms = yield select(
    state => Object.values(state.datasetsfrom).reduce((total, ele) => ([
      ... total,
      ... ele,
    ]), [])
  );

  yield put({
    type: 'datasetsfrom/setDatasetsfroms',
    datasetsfroms: currentDatasetsfroms.filter(
      v => !change.find(ele => ele.id === v.id)
    ),
  });

  message({
    message: '字典删除成功!',
    placement: 'bottomRight',
    code: APP_CODE.DATASETSFROM,
  });
};

// 导出
export default function * () {
  yield takeEvery('datasetsfromManage/createDatasetsfrom', createDatasetsfrom);
  yield takeEvery('datasetsfromManage/updateDatasetsfrom', updateDatasetsfrom);
  yield takeEvery('datasetsfromManage/removeDatasetsfrom', removeDatasetsfrom);
}
