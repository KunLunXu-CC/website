// import * as services from './services';

// import { message } from '@utils';
// import { APP_CODE } from '@config/consts';
import { takeEvery } from 'redux-saga/effects';

/**
 * 获取文章
 * @return {void 0}
 */
const getArticles = function * () {
  // const { change } = yield call(services.createDatasetsfroms, {
  //   body: [body],
  //   spin: APP_CODE.READER,
  // });

  // const currentDatasetsfroms = yield select(
  //   state => Object.values(state.datasetsfrom).reduce((total, ele) => ([
  //     ... total,
  //     ... ele,
  //   ]), [])
  // );

  // yield put({
  //   type: 'datasetsfrom/setDatasetsfroms',
  //   datasetsfroms: [... currentDatasetsfroms, ... change],
  // });

  // message({
  //   placement: 'bottomRight',
  //   message: '字典创建成功!',
  //   code: APP_CODE.READER,
  // });
};

// 导出
export default function * () {
  yield takeEvery('reader/getArticles', getArticles);
}
