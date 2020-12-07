import effects from './effects';
import * as reducers from './reducers';

export const initState = {
  dock: {  // dock 相关配置
    hideDock: false,   // 是否隐藏 dock
  },
  desktop: { // 桌面相关配置
    autoFullScreen: false,  // 自动全屏
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'setting',
};
