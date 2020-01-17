import * as services from './services';

import { put, call, takeEvery } from 'redux-saga/effects';
import { SPIN_CODE, ARTICLE_STATUS } from '@config/consts';

/**
 * 获取菜单: 只查有已发布文章的 tag
 * @return {void 0}
 */
const getMenus = function * () {
  const menus = yield call(services.getTagsWithArticles, {
    spin: SPIN_CODE.APP_ARTICLE,
    search: { status: ARTICLE_STATUS.RELEASE },
  });

  yield put({
    type: 'article/setMenus',
    menus,
  });
};

// 导出
export default function * () {
  yield takeEvery('article/getMenus', getMenus);
}
