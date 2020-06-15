import { put, takeEvery, select } from 'redux-saga/effects';
import { MENU_LIST } from '../consts';

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

// 导出
export default function * () {
  yield takeEvery('read/toggleFirstActiveKey', toggleFirstActiveKey);
}
