import { create } from "zustand";
import { IMonitoringStore, MENU_OPTIONS_KEY } from "../types";

const useMonitoringStore = create<IMonitoringStore>((set, get) => ({
  activeMenuKey: MENU_OPTIONS_KEY.USER,
  setActiveMenuKey: (activeMenuKey) => set({ activeMenuKey }),
}));

export default useMonitoringStore;
