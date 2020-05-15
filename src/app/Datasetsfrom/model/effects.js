import * as services from './services';

import { message } from '@utils';
import { MENU_LIST } from '../consts';
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
    state => state.datasetsfrom.datasetsfroms
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
    state => state.datasetsfrom.datasetsfroms
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
    state => state.datasetsfrom.datasetsfroms
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


/**
 * 获取字典
 *
 * @return {void 0}
 */
const getDatasetsfroms = function * ({ search }) {
  const { selectedKey } = yield select(
    state => state.datasetsfrom.menu
  );
  const code = search ?. code ?? selectedKey;

  const { list: datasetsfroms } = yield call(services.getDatasetsfroms, {
    search: {
      ... search,
      code: code === MENU_LIST[0].key ? void 0 : code,
    },
    spin: APP_CODE.DATASETSFROM,
  });

  yield put({
    datasetsfroms,
    type: 'datasetsfrom/setDatasetsfroms',
  });
};

// 导出
export default function * () {
  yield takeEvery('datasetsfrom/createDatasetsfrom', createDatasetsfrom);
  yield takeEvery('datasetsfrom/getDatasetsfroms', getDatasetsfroms);
  yield takeEvery('datasetsfrom/updateDatasetsfrom', updateDatasetsfrom);
  yield takeEvery('datasetsfrom/removeDatasetsfrom', removeDatasetsfrom);
}
