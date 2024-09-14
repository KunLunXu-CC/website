import { merge } from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MENUS } from '@/app/(home)/AppList/Setting/constants';

export interface ISettingState {
  selectedMenuKey: string; // 应用菜单 key
  dock: {
    hideDock: boolean; // 是否隐藏 dock
  };
  menuBar: {
    showFullScreenOnMenu: boolean; // 在菜单栏显示全屏图标
    showWeek: boolean; // 显示星期
    formatDate: string; // 格式化日期
  };
}

interface ISettingStore extends ISettingState {
  toggleMenu: (selectedMenuKey: string) => void;
  // setSetting: (setting: Partial<ISettingState>) => void;
  updateDock: (dock: Partial<ISettingState['dock']>) => void;
  updateMenuBar: (menuBar: Partial<ISettingState['menuBar']>) => void;
}

const useSettingStore = create<ISettingStore>()(
  persist(
    (set, get) => ({
      selectedMenuKey: MENUS[0].key,
      dock: {
        hideDock: false,
      },
      menuBar: {
        showFullScreenOnMenu: true,
        showWeek: true,
        formatDate: 'YYYY-MM-DD HH:mm:ss',
      },

      toggleMenu: (selectedMenuKey) => set({ selectedMenuKey }),
      updateDock: (dock) => set({ dock: { ...get().dock, ...dock } }),
      updateMenuBar: (menuBar) => set({ menuBar: { ...get().menuBar, ...menuBar } }),
      // setSetting: (setting) => {
      //   const newState = merge(get(), setting);
      //   set(newState);
      // },
    }),
    { name: 'setting', version: 1 },
  ),
);

export default useSettingStore;
