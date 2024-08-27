import dayjs from "dayjs";
import { STATS_SPAN_VALUE } from "./types";

// 弹窗类型常量 - 编辑日记
export const DIARY_EDITOR_DIARY = "DIARY_EDITOR_DIARY";

export const STATS_BILL_DETAIL = "STATS_BILL_DETAIL";

export const REVOKE_SPACE = "REVOKE_SPACE";

// 日记菜单配置
export const DIARY_MENU = {
  CALENDAR: { VALUE: "calendar", DESC: "日历", ICON: "icon-rili" },
  PROJECT: { VALUE: "kanban", DESC: "看板", ICON: "icon-daochu" },
  STATS: { VALUE: "stats", DESC: "统计", ICON: "icon-tongji" },
};

// 统计跨度
export const STATS_SPAN_OPTS = {
  [STATS_SPAN_VALUE.MONTH]: {
    desc: "月",
    conds: [
      dayjs().startOf("month").subtract(12, "months").format("YYYY-MM-DD"),
      dayjs().endOf("month").format("YYYY-MM-DD"),
    ],
  },
  [STATS_SPAN_VALUE.YEAR]: {
    desc: "年",
    conds: [
      dayjs().subtract(10, "years").startOf("years").format("YYYY-MM-DD"),
      dayjs().endOf("years").format("YYYY-MM-DD"),
    ],
  },
};
