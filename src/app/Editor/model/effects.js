import * as services from './services';

import { message } from '@utils';
import { MESSAGE_CONFIG } from '../consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { APP_CODE, PHOTO_TYPE } from '@config/consts';

/**
 * 删除文章
 *
 * @param root0
 * @param root0.id
 * @returns {void 0}
 */
const removeArticle = function * ({ id }) {
  const currentArticles = yield select((state) => state.editor.articles);
  const { change } = yield call(services.removeArticles, {
    spin: APP_CODE.EDITOR,
    conds: { id },
  });

  change.forEach((v) => {
    delete currentArticles[v.id];
  });

  yield put({
    article: id,
    type: 'editor/removeWork',
  });

  yield put({
    type: 'editor/setArticles',
    articles: { ...currentArticles },
  });

  message({ ...MESSAGE_CONFIG, message: '成功删除文章!' });
};

/**
 * 更新文章内容
 *
 * @param root0
 * @param root0.content
 * @param root0.id
 * @returns {void 0}
 */
const updateArticleContent = function * ({ content, id }) {
  const currentArticles = yield select((state) => state.editor.articles);

  const { change = [] } = yield call(services.updateArticles, {
    conds: { id },
    body: { content },
  });

  // 是否更新成功
  if (change[0]?.content !== content) {
    message({
      ...MESSAGE_CONFIG,
      type: 'error',
      message: '文章内容保存失败!',
    });
    return false;
  }

  // 更新 redux 中对应文章内容
  currentArticles[id].content = content;
  yield put({
    type: 'editor/setArticles',
    articles: { ...currentArticles },
  });

  yield put({
    article: id,
    type: 'editor/setWork',
    work: { change: false },
  });

  message({ ...MESSAGE_CONFIG, message: '文章内容保存成功!' });
};

/**
 * 撤销(取消发布)文章
 *
 * @param root0
 * @param root0.id
 * @returns {void 0}
 */
const revokeArticle = function * ({ id }) {
  const currentArticles = yield select((state) => state.editor.articles);

  const { change } = yield call(services.revokeArticles, {
    conds: { id },
    spin: APP_CODE.EDITOR,
  });

  yield put({
    articles: change.reduce((total, ele) => ({
      ...total,
      [ele.id]: ele,
    }), currentArticles),
    type: 'editor/setArticles',
  });

  message({ ...MESSAGE_CONFIG, message: '下架成功!' });
};

/**
 * 发布文章
 *
 * @param root0
 * @param root0.id
 * @returns {void 0}
 */
const releaseArticle = function * ({ id }) {
  const currentArticles = yield select((state) => state.editor.articles);
  const { change } = yield call(services.releaseArticles, {
    conds: { id },
    spin: APP_CODE.EDITOR,
  });

  yield put({
    articles: change.reduce((total, ele) => ({
      ...total,
      [ele.id]: ele,
    }), currentArticles),
    type: 'editor/setArticles',
  });

  message({ ...MESSAGE_CONFIG, message: '发布成功!' });
};

/**
 * 设置文章缩略图
 *
 * @param root0
 * @param root0.file
 * @param root0.id
 * @returns {void 0}
 */
const setArticleThumb = function * ({ file, id }) {
  const res = yield call(services.uploadPhotos, {
    payload: id,
    files: [file],
    type: PHOTO_TYPE.ARTICLE.VALUE,
    spin: APP_CODE.EDITOR,
  });

  message({ ...MESSAGE_CONFIG, message: '缩略图上传成功!' });

  yield put({
    id,
    type: 'editor/updateArticle',
    body: { thumb: res?.[0]?.url },
  });
};

// 导出
/**
 *
 */
export default function * () {
  yield takeEvery('editor/removeArticle', removeArticle);
  yield takeEvery('editor/updateArticleContent', updateArticleContent);
  yield takeEvery('editor/revokeArticle', revokeArticle);
  yield takeEvery('editor/releaseArticle', releaseArticle);
  yield takeEvery('editor/setArticleThumb', setArticleThumb);
}
