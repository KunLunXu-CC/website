import effects from './effects';
import * as reducers from './reducers';

export const initState = {
  dock: {  // dock 相关配置
    hideDock: false,   // 是否隐藏 dock
  },
  menuBar: { // 菜单栏
    showFullScreenOnMenu: true,  // 在菜单栏显示全屏图标
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'setting',
};
