import * as services from './services';

// import { message } from '@utils';
// import { APP_CODE } from '@config/consts';
import { takeEvery, call, select } from 'redux-saga/effects';

/**
 * 获取文章
 * @return {void 0}
 */
const getArticles = function * () {
  const { menu } = yield select(state => state.reader);

  const articles = yield call(services.getArticles, {
    search: { type: [menu.selectedKey] },
    pagination: { current: 1, pageSize: 10 },
  });

  console.log('--->>> articles', articles);

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
