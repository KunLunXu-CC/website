import * as services from './services';

import { put, call, takeEvery } from 'redux-saga/effects';
import { APP_CODE, ARTICLE_STATUS, TAG_ALL } from '@config/consts';

/**
 * 获取菜单: 只查有已发布文章的 tag
 * @return {void 0}
 */
const getMenus = function * () {
  const menus = yield call(services.getTagsWithArticles, {
    spin: APP_CODE.ARTICLE,
    search: { status: ARTICLE_STATUS.RELEASE },
  });

  yield put({
    type: 'article/setMenus',
    menus,
  });
};

/**
 * 获取文章列表数据
 * @return {void 0}
 */
const getArticles = function * ({ search }) {
  const _search = {
    ... search,
    status: ARTICLE_STATUS.RELEASE,
  };

  if (_search.tag === TAG_ALL.id) {
    _search.tag = void 0;
  }

  const articles = yield call(services.getArticles, {
    spin: APP_CODE.ARTICLE,
    search: _search,
  });

  yield put({
    articles,
    type: 'article/setArticles',
  });
};

/**
 * 获取热门文章
 * @return {void 0}
 */
const getArticleTops = function * () {
  const articleTops = yield call(services.getArticles, {
    spin: APP_CODE.ARTICLE,
    orderBy: { viewCount: -1 },
    pagination: { curent: 1, pageSize: 10 },
    search: { status: ARTICLE_STATUS.RELEASE },
  });

  yield put({
    articleTops,
    type: 'article/setArticleTops',
  });
};

// 导出
export default function * () {
  yield takeEvery('article/getMenus', getMenus);
  yield takeEvery('article/getArticles', getArticles);
  yield takeEvery('article/getArticleTops', getArticleTops);
}
