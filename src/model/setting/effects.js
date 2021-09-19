import { put } from 'redux-saga/effects';
import { initState } from './index.model';

/**
 * 初始化数据: 在初始初始化 redux 就会被执行
 * @return {undefined}
 */
const init = function * () {
  const setting = localStorage.getItem('setting');
  yield put({
    type: 'setting/setValue',
    setting: setting ? JSON.parse(setting) : initState,
  });
};

// 导出
export default function * () {
  yield init();
}
