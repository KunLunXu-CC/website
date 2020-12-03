import { put } from 'redux-saga/effects';
import { LOCALSTORAGE_KEY } from '../consts';

/**
 * 初始化数据: 在初始初始化 redux 就会被执行
 * @return {undefined}
 */
const init = function * () {
  const setting = localStorage.getItem(LOCALSTORAGE_KEY);
  yield put({
    type: 'setting/setValue',
    setting: setting ? JSON.parse(setting) : {},
  });
};

// 导出
export default function * () {
  yield init();
}
