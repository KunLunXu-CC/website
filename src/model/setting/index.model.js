import effects from './effects';
import * as reducers from './reducers';

export const initState = {
  dock: {  // dock 相关配置
    hideDock: false,   // 是否隐藏 dock
  },
  menuBar: { // 菜单栏
    showFullScreenOnMenu: true,        // 在菜单栏显示全屏图标
    showWeek: true,                    // 显示星期
    formatDate: 'YYYY-MM-DD HH:mm:ss', // 格式化日期
  },
};

export default {
  effects,
  reducers,
  state: initState,
  namespace: 'setting',
};
