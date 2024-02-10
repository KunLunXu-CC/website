import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { MENUS } from '@/app/home/AppList/Setting/constants';

export const initialState = {
  selectedMenuKey: MENUS[0].key, // 应用菜单 key
  dock: {  // dock 相关配置
    hideDock: false,   // 是否隐藏 dock
  },
  menuBar: { // 菜单栏
    showFullScreenOnMenu: true,        // 在菜单栏显示全屏图标
    showWeek: true,                    // 显示星期
    formatDate: 'YYYY-MM-DD HH:mm:ss', // 格式化日期
  },
};

export default createSlice({
  initialState,
  name: 'setting',
  reducers: {
    init: (state) => {
      const setting = localStorage.getItem('setting');
      return setting ? JSON.parse(setting) : state;
    },

    toggleMenu: (state, { payload: selectedMenuKey }) => ({
      ...state,
      selectedMenuKey,
    }),

    set: (state, { payload: setting }) => {
      const newState = _.merge(state, setting);
      localStorage.setItem('setting', JSON.stringify(newState));
      return newState;
    },
  },
});
