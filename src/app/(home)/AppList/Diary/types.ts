import { DiaryItemFragment } from "@/gql/graphql";
import { Dayjs } from "dayjs";

export enum STATS_SPAN_VALUE {
  MONTH = "month",
  YEAR = "year",
}

export interface IDiaryState {
  selectedMenuKey: string;
}

export interface IDiaryStore extends IDiaryState {
  setSelectedMenuKey: (key: IDiaryState["selectedMenuKey"]) => void;
}

// -----

export interface ICalendarState {
  diaries: DiaryItemFragment[];
  currentMonth: string;
  editDiary: { date: Dayjs; diary?: DiaryItemFragment } | null;
}

export interface ICalendarStore extends ICalendarState {
  setDiaries: (diaries: ICalendarState["diaries"]) => void;
  setCurrentMonth: (currentMonth: ICalendarState["currentMonth"]) => void;
  updateDiaries: (diaries: ICalendarState["diaries"]) => void;
  setEditDiary: (args: ICalendarState["editDiary"]) => void;
}
