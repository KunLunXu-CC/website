import * as services from './services';

import { SPIN_CODE, PHOTO_TYPE } from '@config/consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';

/**
 * 初始化: 一次性获取所有数据并在前端进行存储
 * @return {void 0}
 */
const initData = function * () {
  const { tags, articles } = yield call(services.initData, {});

  yield put({
    type: 'editor/setTags',
    tags: tags.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), {}),
  });

  yield put({
    type: 'editor/setArticles',
    articles: articles.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), {}),
  });
};

/**
 * 删除标签
 * @return {void 0}
 */
const removeTag = function * ({ id }) {
  const currentTags = yield select(state => state.editor.tags);

  const { change } = yield call(services.removeTags, {
    spin: SPIN_CODE.APP_EDITOR,
    conds: { id },
  });

  change.forEach(v => {
    delete currentTags[v.id];
  });

  yield put({
    type: 'editor/setTags',
    tags: { ... currentTags },
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

  change.forEach(v => {
    delete currentArticles[v.id];
  });

  yield put({
    article: id,
    type: 'editor/removeWork',
  });

  yield put({
    type: 'editor/setArticles',
    articles: { ... currentArticles },
  });
};

/**
 * 创建标签
 * @return {void 0}
 */
const createTag = function * ({ body }) {
  const currentTags = yield select(state => state.editor.tags);
  delete currentTags.newTag;

  const { change } = yield call(services.createTags, {
    body,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    tags: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentTags),
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
    tags: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentTags),
    type: 'editor/setTags',
  });
};

/**
 * 创建文章
 * @return {void 0}
 */
const createArticle = function * ({ body }) {
  const currentArticles = yield select(state => state.editor.articles);
  delete currentArticles.newArticle;

  const { change } = yield call(services.createArticles, {
    body,
    spin: SPIN_CODE.APP_EDITOR,
  });

  yield put({
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
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
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
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
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
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
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
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
  yield takeEvery('editor/initData', initData);
  yield takeEvery('editor/removeTag', removeTag);
  yield takeEvery('editor/removeArticle', removeArticle);

  yield takeEvery('editor/createTag', createTag);
  yield takeEvery('editor/updateTag', updateTag);
  yield takeEvery('editor/createArticle', createArticle);
  yield takeEvery('editor/updateArticle', updateArticle);

  yield takeEvery('editor/revokeArticle', revokeArticle);
  yield takeEvery('editor/releaseArticle', releaseArticle);
  yield takeEvery('editor/setArticleThumb', setArticleThumb);
}
