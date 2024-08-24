import { DiaryItemFragment } from "@/gql/graphql";
import { set } from "lodash";

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
}
