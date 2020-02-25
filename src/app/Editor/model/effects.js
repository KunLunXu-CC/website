import * as services from './services';

import { SPIN_CODE, PHOTO_TYPE } from '@config/consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 获取标签
 * @return {void 0}
 */
const getTags = function * ({ search }) {
  const currentTags = yield select(state => state.editor.tags);
  const tags = yield call(services.getTags, {
    spin: SPIN_CODE.APP_EDITOR,
    search,
  });
  yield put({
    type: 'editor/setTags',
    tags: _.uniqBy([... currentTags, ... tags], 'id'),
  });
};

/**
 * 获取文章
 * @return {void 0}
 */
const getArticles = function * ({ search }) {
  const currentArticles = yield select(state => state.editor.articles);

  const articles = yield call(services.getArticles, {
    search,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    type: 'editor/setArticles',
    articles: _.uniqBy([... currentArticles, ... articles], 'id'),
  });
};

/**
 * 删除标签
 * @return {void 0}
 */
const removeTags = function * ({ id }) {
  const currentTags = yield select(state => state.editor.tags);

  const { change } = yield call(services.removeTags, {
    spin: SPIN_CODE.APP_EDITOR,
    conds: { id },
  });

  yield put({
    type: 'editor/setTags',
    tags: currentTags.filter(v => !change.find(ele => ele.id === v.id)),
  });
};

/**
 * 删除文章
 * @return {void 0}
 */
const removeArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);
  const { change } = yield call(services.removeArticles, {
    spin: SPIN_CODE.APP_EDITOR,
    conds: { id },
  });

  yield put({
    article: id,
    type: 'editor/removeWorks',
  });

  yield put({
    type: 'editor/setArticles',
    articles: currentArticles.filter(v => !change.find(ele => ele.id === v.id)),
  });
};

/**
 * 创建标签
 * @return {void 0}
 */
const createTag = function * ({ body }) {
  const currentTags = yield select(state => state.editor.tags);

  const { change } = yield call(services.createTags, {
    body,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags: _.uniqBy([
      ... change,
      ... currentTags.filter(v => !v.editor),
    ], 'id'),
    type: 'editor/setTags',
  });
};

/**
 * 更新标签
 * @return {void 0}
 */
const updateTag = function * ({ body, id }) {
  const currentTags = yield select(state => state.editor.tags);

  const { change } = yield call(services.updateTags, {
    body,
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags: _.uniqBy([
      ... change,
      ... currentTags.filter(v => v.id !== id),
    ], 'id'),
    type: 'editor/setTags',
  });
};

/**
 * 创建文章
 * @return {void 0}
 */
const createArticle = function * ({ body }) {
  const currentArticles = yield select(state => state.editor.articles);

  const { change } = yield call(services.createArticles, {
    body,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles: _.uniqBy([
      ... change,
      ... currentArticles.filter(v => !v.editor),
    ], 'id'),
    type: 'editor/setArticles',
  });

  yield put({
    type: 'editor/appendWorks',
    article: _.get(change, '[0].id'),
  });
};

/**
 * 更新文章
 * @return {void 0}
 */
const updateArticle = function * ({ body, id }) {
  const currentArticles = yield select(state => state.editor.articles);

  const { change } = yield call(services.updateArticles, {
    body,
    conds: { id },
  });

  yield put({
    articles: _.uniqBy([... change, ... currentArticles], 'id'),
    type: 'editor/setArticles',
  });

  yield put({
    article: id,
    type: 'editor/setWork',
    work: { change: false },
  });
};

/**
 * 撤销(取消发布)文章
 * @return {void 0}
 */
const revokeArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);

  const { change } = yield call(services.revokeArticles, {
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles: _.uniqBy([... change, ... currentArticles], 'id'),
    type: 'editor/setArticles',
  });
};

/**
 * 发布文章
 * @return {void 0}
 */
const releaseArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);
  const { change } = yield call(services.releaseArticles, {
    conds: { id },
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles: _.uniqBy([... change, ... currentArticles], 'id'),
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
