import Dock from "./Dock";
import MenuBar from "./MenuBar";

export const LOCALSTORAGE_KEY = "setting"; // 本地存储 key 值

export const MENUS = [
  {
    title: "程序坞", // 标题
    key: "dock", // redux 中对应 key 值
    component: Dock,
  },
  {
    title: "菜单栏", // 标题
    key: "menuBar", // redux 中对应 key 值
    component: MenuBar,
  },
];
