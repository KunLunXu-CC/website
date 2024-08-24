import dayjs from "dayjs";

import { create } from "zustand";
import { ICalendarStore } from "../types";

const useCalendarStore = create<ICalendarStore>((set, get) => ({
  diaries: [],
  currentMonth: dayjs().format("YYYY-MM"),
  setDiaries: (diaries) => set({ diaries }),
  setCurrentMonth: (currentMonth) => set({ currentMonth }),
}));

export default useCalendarStore;
