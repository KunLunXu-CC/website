import effects from './effects';
import * as reducers from './reducers';

const initState = {
  desktopBg: null,   // 桌面背景
  hideDock: false,   // 是否隐藏 dock
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'setting',
};
