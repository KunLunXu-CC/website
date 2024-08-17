import User from "./User";
import Role, { BottomBtn } from "./Role";
import { MENU_OPTIONS_KEY } from "./types";

export const MENU_OPTIONS = [
  {
    body: User,
    title: "用户管理",
    key: MENU_OPTIONS_KEY.USER,
    bg: {
      side: "linear-gradient(160deg, #3fb09b, #3b4172)",
      body: "linear-gradient(160deg, #3fb09b, #3b4172)",
    },
  },
  {
    body: Role,
    title: "角色管理",
    key: MENU_OPTIONS_KEY.ROLE,
    bg: {
      side: "linear-gradient(160deg, #6396ba, #3b4071)",
      body: "linear-gradient(160deg, #6396ba, #3b4071)",
    },
  },
];
