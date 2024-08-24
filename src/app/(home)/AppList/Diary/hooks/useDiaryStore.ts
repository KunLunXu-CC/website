import { create } from "zustand";
import { IDiaryStore } from "../types";

import { DIARY_MENU } from "../constants";

const useDiaryStore = create<IDiaryStore>((set, get) => ({
  selectedMenuKey: DIARY_MENU.CALENDAR.VALUE,
  setSelectedMenuKey: (key) => set({ selectedMenuKey: key }),
}));

export default useDiaryStore;
