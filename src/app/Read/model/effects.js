import * as services from './services';
import { MENU_LIST } from '../consts';
import { DATASETSFROM_CODE } from '@config/consts';
import { put, takeEvery, select, call } from 'redux-saga/effects';

/**
 * 切换一级菜单
 * @return {void 0}
 */
const toggleFirstActiveKey = function * ({
  firstActiveKey = MENU_LIST[0].VALUE,
} = {}) {
  const datasetsfrom = yield select(state => state.datasetsfrom);
  yield put({
    type: 'read/setMenu',
    menu: {
      firstActiveKey,
      secondActiveKey: datasetsfrom[firstActiveKey] ?. [0].value,
    },
  });
};

/**
 * 创建数据
 * @return {void 0}
 */
const onCreate = function * () {
  const {
    content,
    firstActiveKey,
    secondActiveKey,
  } = yield select(state => ({
    id: state.read.editor.current ?. id,
    content: state.read.editor.current ?. content,
    firstActiveKey: state.read.menu.firstActiveKey,
    secondActiveKey: state.read.menu.secondActiveKey,
  }));

  const map = {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: services.createSnippet,
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: services.createInterview,
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: services.createAlgorithm,
  };
  const { change } = yield call(map[firstActiveKey], {
    body: { content, tags: [secondActiveKey] },
  });
  yield put({ type: 'read/setListData', data: change });
};

/**
 * 保存数据
 * @return {void 0}
 */
const onSave = function * () {
  const id = yield select(state => (state.read.editor.current ?. id));
  !id && (yield onCreate());

  yield put({
    type: 'read/setEditor',
    editor: { current: null },
  });
};

// 获取列表数据
const getListData = function * () {
  const {
    firstActiveKey,
    secondActiveKey,
  } = yield select(state => (state.read.menu));
  if (!firstActiveKey || !secondActiveKey) {
    return false;
  }
  const map = {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: services.getSnippets,
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: services.getInterviews,
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: services.getAlgorithms,
  };
  const data = yield call(map[firstActiveKey], {
    searcj: { ags: [secondActiveKey] },
  });
  console.log('--------------', data);
};

// 导出
export default function * () {
  yield takeEvery('read/toggleFirstActiveKey', toggleFirstActiveKey);
  yield takeEvery('read/getListData', getListData);
  yield takeEvery('read/onSave', onSave);
}
