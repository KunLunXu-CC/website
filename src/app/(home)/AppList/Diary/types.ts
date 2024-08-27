import { DiaryItemFragment } from "@/gql/graphql";

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
}

export interface ICalendarStore extends ICalendarState {
  setDiaries: (diaries: ICalendarState["diaries"]) => void;
  setCurrentMonth: (currentMonth: ICalendarState["currentMonth"]) => void;
  updateDiaries: (diaries: ICalendarState["diaries"]) => void;
}
