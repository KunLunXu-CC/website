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
    listData,
    firstActiveKey,
    secondActiveKey,
  } = yield select(state => ({
    listData: state.read.listData,
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
  yield put({
    type: 'read/setListData',
    listData: {
      ... listData,
      [firstActiveKey]: [... listData[firstActiveKey], ... change],
    },
  });
};

/**
 * 修改数据
 * @return {void 0}
 */
const onUpdate = function * () {
  const {
    id,
    content,
    listData,
    firstActiveKey,
  } = yield select(state => ({
    listData: state.read.listData,
    id: state.read.editor.current ?. id,
    content: state.read.editor.current ?. content,
    firstActiveKey: state.read.menu.firstActiveKey,
  }));

  const map = {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: services.updateSnippet,
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: services.updateInterview,
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: services.updateAlgorithm,
  };
  const change = yield call(map[firstActiveKey], {
    conds: { id },
    body: { content },
  });
  yield put({
    type: 'read/setListData',
    listData: {
      ... listData,
      [firstActiveKey]: listData[firstActiveKey].map(v => (
        v.id === change.id ? change : v
      )),
    },
  });
};

/**
 * 保存数据
 * @return {void 0}
 */
const onSave = function * () {
  const id = yield select(state => (state.read.editor.current ?. id));
  yield (id ? onUpdate : onCreate)();
  yield put({
    type: 'read/setEditor',
    editor: { current: null },
  });
};

/**
 * 获取列表数据
 * @param {Boolean} append 是否进行数据的追加
 */
const getListData = function * ({ append = false }) {
  const {
    menu: {
      firstActiveKey,
      secondActiveKey,
    },
    listData,
  } = yield select(state => (state.read));
  if (!firstActiveKey || !secondActiveKey) {
    return false;
  }
  const map = {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: services.getSnippets,
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: services.getInterviews,
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: services.getAlgorithms,
  };
  const data = yield call(map[firstActiveKey], {
    search: { tags: [secondActiveKey] },
  });
  yield put({
    type: 'read/setListData',
    listData: {
      ... listData,
      [firstActiveKey]: [
        ... (append ? listData[firstActiveKey] : []),
        ... data,
      ],
    },
  });
};

// 删除数据
const onDelete = function * ({ id }) {
  const {
    menu: {
      firstActiveKey,
      secondActiveKey,
    },
    listData,
  } = yield select(state => (state.read));
  if (!firstActiveKey || !secondActiveKey) {
    return false;
  }
  const map = {
    [DATASETSFROM_CODE.SNIPPETS_TAG.VALUE]: services.removeSnippet,
    [DATASETSFROM_CODE.INTERVIEW_TAG.VALUE]: services.removeInterview,
    [DATASETSFROM_CODE.ALGORITHM_TAG.VALUE]: services.removeAlgorithm,
  };
  const change = yield call(map[firstActiveKey], { conds: { id } });
  yield put({
    type: 'read/setListData',
    listData: {
      ... listData,
      [firstActiveKey]: listData[firstActiveKey].filter(
        v => v.id !== change.id
      ),
    },
  });
};

// 导出
export default function * () {
  yield takeEvery('read/toggleFirstActiveKey', toggleFirstActiveKey);
  yield takeEvery('read/getListData', getListData);
  yield takeEvery('read/onDelete', onDelete);
  yield takeEvery('read/onSave', onSave);
}
