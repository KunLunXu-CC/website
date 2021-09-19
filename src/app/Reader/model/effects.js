import * as services from './services';

import { ARTICLE_STATUS } from '@config/consts';
import { takeEvery, call, select, put } from 'redux-saga/effects';

/**
 * 获取文章
 * @return {void 0}
 */
const getArticles = function * () {
  const { menu } = yield select((state) => state.reader);

  const articles = yield call(services.getArticles, {
    search: {
      type: [menu.selectedKey],
      status: [ARTICLE_STATUS.RELEASE],
    },
    pagination: { current: 1, pageSize: 10 },
  });

  yield put({
    articles,
    type: 'reader/setArticles',
  });
};

/**
 * 打开文章
 * @return {void 0}
 */
const openArticle = function * ({ article }) {
  yield put({
    detail: { article },
    type: 'reader/setDetail',
  });
};

/**
 * 关闭文章
 * @return {void 0}
 */
const closeArticle = function * () {
  yield put({
    detail: { article: null },
    type: 'reader/setDetail',
  });
};

// 导出
export default function * () {
  yield takeEvery('reader/getArticles', getArticles);
  yield takeEvery('reader/openArticle', openArticle);
  yield takeEvery('reader/closeArticle', closeArticle);
}
