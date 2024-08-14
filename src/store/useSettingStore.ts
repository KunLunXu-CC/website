import { merge } from "lodash";
import { create } from "zustand";
import { MENUS } from "@/app/(home)/AppList/Setting/constants";

interface ISettingState {
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
  initSettingStore: () => void;
  toggleMenu: (selectedMenuKey: string) => void;
  setSetting: (setting: ISettingState) => void;
}

const useSettingStore = create<ISettingStore>((set, get) => ({
  selectedMenuKey: MENUS[0].key,
  dock: {
    hideDock: false,
  },
  menuBar: {
    showFullScreenOnMenu: true,
    showWeek: true,
    formatDate: "YYYY-MM-DD HH:mm:ss",
  },

  initSettingStore: () => {
    const setting = localStorage.getItem("setting");
    if (setting) {
      set(JSON.parse(setting));
    }
  },

  toggleMenu: (selectedMenuKey) => set({ selectedMenuKey }),

  setSetting: (setting) => {
    const newState = merge(get(), setting);
    localStorage.setItem("setting", JSON.stringify(newState));
    set(newState);
  },
}));

export default useSettingStore;
