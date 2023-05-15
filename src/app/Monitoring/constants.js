import Role, { BottomBtn } from './Role';
import User from './User';

export const span = '1';

export const MENU_OPTIONS = [
  {
    key: 1,
    body: User,
    title: '用户管理',
    bottomBtn: BottomBtn,
    bg: {
      side: 'linear-gradient(160deg, #3fb09b, #3b4172)',
      body: 'linear-gradient(160deg, #3fb09b, #3b4172)',
    },
  },
  {
    key: 2,
    body: Role,
    title: '角色管理',
    bottomBtn: BottomBtn,
    bg: {
      side: 'linear-gradient(160deg, #6396ba, #3b4071)',
      body: 'linear-gradient(160deg, #6396ba, #3b4071)',
    },
  },
];
