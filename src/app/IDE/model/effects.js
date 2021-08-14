import * as services from './services';

import { message } from '@utils';
import { MESSAGE_CONFIG } from '../consts';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { APP_CODE, PHOTO_TYPE, DATASETSFROM_CODE } from '@config/consts';

/**
 * 初始化: 一次性获取所有数据并在前端进行存储
 * @return {void 0}
 */
const initData = function * () {
  // 如果已初始化则不再次初始化
  const currentTags = yield select(state => state.editor.tags);
  if (!_.isEmpty(currentTags)) {
    return false;
  }

  const { tags, articles } = yield call(services.initData, {});

  yield put({
    type: 'editor/setTags',
    tags: tags.reduce((total, ele) => ({ ... total, [ele.id]: ele }), {}),
  });

  yield put({
    type: 'editor/setArticles',
    articles: articles.reduce(
      (total, ele) => ({ ... total, [ele.id]: ele }),
      {}
    ),
  });

  message({ ... MESSAGE_CONFIG, message: '数据初始化完成!' });
};

/**
 * 创建标签
 * @return {void 0}
 */
const createTag = function * ({ body }) {
  const currentTags = yield select(state => state.editor.tags);
  delete currentTags.new;

  const { change } = body.name ?
    yield call(services.createDatasetsfroms, {
      spin: APP_CODE.EDITOR,
      body: {
        ... body,
        value: 0,
        code: DATASETSFROM_CODE.ARTICLE_TAG.VALUE,
      },
    }) : { change: [] };

  yield put({
    tags: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), { ... currentTags }),
    type: 'editor/setTags',
  });

  message({
    ... MESSAGE_CONFIG,
    type: body.name ? 'success' : 'error',
    message: body.name ? '操作成功!' : '名称不能为空!',
  });
};

/**
 * 更新标签
 * @return {void 0}
 */
const updateTag = function * ({ body, id }) {
  const currentTags = yield select(state => state.editor.tags);

  const { change } = yield call(services.updateDatasetsfroms, {
    body,
    conds: { id },
    spin: APP_CODE.EDITOR,
  });

  yield put({
    tags: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentTags),
    type: 'editor/setTags',
  });

  message({ ... MESSAGE_CONFIG, message: '成功更新标签!' });
};

/**
 * 删除标签
 * @return {void 0}
 */
const removeTag = function * ({ id, childrenLength }) {
  if (childrenLength > 0) {
    message({
      ... MESSAGE_CONFIG,
      type: 'error',
      message: '不允许删除非空目录!',
    });
    return false;
  }

  const currentTags = yield select(state => state.editor.tags);
  const { change } = yield call(services.removeDatasetsfroms, {
    spin: APP_CODE.EDITOR,
    conds: { id },
  });

  change.forEach(v => {
    delete currentTags[v.id];
  });

  yield put({
    type: 'editor/setTags',
    tags: { ... currentTags },
  });

  message({ ... MESSAGE_CONFIG, message: '成功移除标签!' });
};

/**
 * 删除文章
 * @return {void 0}
 */
const removeArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);
  const { change } = yield call(services.removeArticles, {
    spin: APP_CODE.EDITOR,
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

  message({ ... MESSAGE_CONFIG, message: '成功删除文章!' });
};

/**
 * 创建文章
 * @return {void 0}
 */
const createArticle = function * ({ body }) {
  const currentArticles = yield select(state => state.editor.articles);
  delete currentArticles.new;

  const { change } = body.name ?
    yield call(services.createArticles, {
      body,
      spin: APP_CODE.EDITOR,
    }) : { change: [] };

  yield put({
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), { ... currentArticles }),
    type: 'editor/setArticles',
  });

  yield put({
    type: 'editor/appendWorks',
    article: _.get(change, '[0].id'),
  });

  message({
    ... MESSAGE_CONFIG,
    type: body.name ? 'success' : 'error',
    message: body.name ? '操作成功!' : '名称不能为空!',
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

  message({ ... MESSAGE_CONFIG, message: '成功修改文章信息!' });
};

/**
 * 更新文章内容
 * @return {void 0}
 */
const updateArticleContent = function * ({ content, id }) {
  const currentArticles = yield select(state => state.editor.articles);

  const { change = [] } = yield call(services.updateArticles, {
    conds: { id },
    body: { content },
  });

  // 是否更新成功
  if (change[0]?.content !== content) {
    message({
      ... MESSAGE_CONFIG,
      type: 'error',
      message: '文章内容保存失败!',
    });
    return false;
  }

  // 更新 redux 中对应文章内容
  currentArticles[id].content = content;
  yield put({
    type: 'editor/setArticles',
    articles: { ... currentArticles },
  });

  yield put({
    article: id,
    type: 'editor/setWork',
    work: { change: false },
  });

  message({ ... MESSAGE_CONFIG, message: '文章内容保存成功!' });
};

/**
 * 撤销(取消发布)文章
 * @return {void 0}
 */
const revokeArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);

  const { change } = yield call(services.revokeArticles, {
    conds: { id },
    spin: APP_CODE.EDITOR,
  });

  yield put({
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
    type: 'editor/setArticles',
  });

  message({ ... MESSAGE_CONFIG, message: '下架成功!' });
};

/**
 * 发布文章
 * @return {void 0}
 */
const releaseArticle = function * ({ id }) {
  const currentArticles = yield select(state => state.editor.articles);
  const { change } = yield call(services.releaseArticles, {
    conds: { id },
    spin: APP_CODE.EDITOR,
  });

  yield put({
    articles: change.reduce((total, ele) => ({
      ... total,
      [ele.id]: ele,
    }), currentArticles),
    type: 'editor/setArticles',
  });

  message({ ... MESSAGE_CONFIG, message: '发布成功!' });
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
    spin: APP_CODE.EDITOR,
  });

  message({ ... MESSAGE_CONFIG, message: '缩略图上传成功!' });

  yield put({
    id,
    type: 'editor/updateArticle',
    body: { thumb: _.get(res, '[0].url', '') },
  });
};

// 导出
export default function * () {
  yield takeEvery('editor/initData', initData);

  yield takeEvery('editor/createTag', createTag);
  yield takeEvery('editor/updateTag', updateTag);
  yield takeEvery('editor/removeTag', removeTag);

  yield takeEvery('editor/createArticle', createArticle);
  yield takeEvery('editor/updateArticle', updateArticle);
  yield takeEvery('editor/removeArticle', removeArticle);
  yield takeEvery('editor/updateArticleContent', updateArticleContent);
  yield takeEvery('editor/revokeArticle', revokeArticle);
  yield takeEvery('editor/releaseArticle', releaseArticle);
  yield takeEvery('editor/setArticleThumb', setArticleThumb);
}
