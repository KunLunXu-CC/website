import Dock from './Dock';
import Desktop from './Desktop';

export const LOCALSTORAGE_KEY = 'setting';  // 本地存储 key 值

export const MENUS = [
  {
    title: '程序坞', // 标题
    key: 'dock',    // redux 中对应 key 值
    component: Dock,
  },
  {
    title: '系统桌面', // 标题
    key: 'desktop',    // redux 中对应 key 值
    component: Desktop,
  },
];
