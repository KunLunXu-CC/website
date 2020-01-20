import * as services from './services';

import { SPIN_CODE, PHOTO_TYPE } from '@config/consts';
import { put, call, takeEvery } from 'redux-saga/effects';

/**
 * 获取所有标签
 * @return {void 0}
 */
const getTags = function * () {
  const tags = yield call(services.getTags, {
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags,
    type: 'editor/setTags',
  });
};

/**
 * 获取文章
 * @return {void 0}
 */
const getArticles = function * () {
  const articles = yield call(services.getArticles, {
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};

/**
 * 删除标签
 * @return {void 0}
 */
const removeTags = function * ({ id }) {
  const tags = yield call(services.removeTags, {
    spin: SPIN_CODE.APP_EDITOR,
    conds: { id },
    search: {},
  });

  yield put({
    tags,
    type: 'editor/setTags',
  });
};

/**
 * 删除文章
 * @return {void 0}
 */
const removeArticle = function * ({ id }) {
  yield put({
    article: id,
    type: 'editor/removeWorks',
  });

  const articles = yield call(services.removeArticles, {
    spin: SPIN_CODE.APP_EDITOR,
    conds: { id },
    search: {},
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};

/**
 * 创建标签
 * @return {void 0}
 */
const createTag = function * ({ body }) {
  const tags = yield call(services.createTags, {
    body,
    search: {},
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags,
    type: 'editor/setTags',
  });
};

/**
 * 更新标签
 * @return {void 0}
 */
const updateTag = function * ({ body, id }) {
  const tags = yield call(services.updateTags, {
    body,
    search: {},
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags,
    type: 'editor/setTags',
  });
};

/**
 * 创建文章
 * @return {void 0}
 */
const createArticle = function * ({ body }) {
  const articles = yield call(services.createArticles, {
    body,
    search: {},
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};


/**
 * 更新文章
 * @return {void 0}
 */
const updateArticle = function * ({ body, id }) {
  const articles = yield call(services.updateArticles, {
    body,
    search: {},
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};

/**
 * 撤销(取消发布)文章
 * @return {void 0}
 */
const revokeArticle = function * ({ id }) {
  const articles = yield call(services.revokeArticle, {
    search: {},
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};

/**
 * 发布文章
 * @return {void 0}
 */
const releaseArticle = function * ({ id }) {
  const articles = yield call(services.releaseArticle, {
    search: {},
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles,
    type: 'editor/setArticles',
  });
};

/**
 * 设置文章缩略图
 * @return {void 0}
 */
const setArticleThumb = function * ({ file, id }) {
  const res = yield call(services.uploadPhotos, {
    payload: id,
    files: [file],
    type: PHOTO_TYPE.ARTICLE.VALUE,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    id,
    type: 'editor/updateArticle',
    body: { thumb: _.get(res, '[0].url', '') },
  });
};

// 导出
export default function * () {
  yield takeEvery('editor/getTags', getTags);
  yield takeEvery('editor/removeTags', removeTags);
  yield takeEvery('editor/getArticles', getArticles);
  yield takeEvery('editor/removeArticle', removeArticle);

  yield takeEvery('editor/createTag', createTag);
  yield takeEvery('editor/updateTag', updateTag);
  yield takeEvery('editor/createArticle', createArticle);
  yield takeEvery('editor/updateArticle', updateArticle);

  yield takeEvery('editor/revokeArticle', revokeArticle);
  yield takeEvery('editor/releaseArticle', releaseArticle);
  yield takeEvery('editor/setArticleThumb', setArticleThumb);
}
