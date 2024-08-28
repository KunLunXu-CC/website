import dayjs from "dayjs";

import { uniqBy } from "lodash";
import { create } from "zustand";
import { ICalendarStore } from "../types";

const useCalendarStore = create<ICalendarStore>((set, get) => ({
  diaries: [],
  editDiary: null, // 编辑的日记
  currentMonth: dayjs().format("YYYY-MM"),
  setDiaries: (diaries) => set({ diaries }),
  setCurrentMonth: (currentMonth) => set({ currentMonth }),
  updateDiaries: (diaries) =>
    set({
      diaries: uniqBy([...diaries, ...get().diaries], "id"),
    }),
  setEditDiary: (args) =>
    set({
      editDiary: args
        ? {
            date: args.date,
            diary: args.diary,
          }
        : null,
    }),
}));

export default useCalendarStore;
