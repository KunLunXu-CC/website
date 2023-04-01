import AI from './AI';
import User from './User';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Logger from './Logger';
import Setting from './Setting';
import { APP_CODE } from '@config/constants';

export default {
  [APP_CODE.AI]: {
    name: 'AI',
    component: AI,
    icon: 'klx.pro.71e88db3660e596de6ded68375b8bb38.svg',
    code: APP_CODE.AI,
    modalProps: {
      dragHeight: 30,
      toolPosition: { top: 6, left: -4 },
      toolStyle: { transform: 'scale(0.8)' },
      defaultParams: { width: 1000, height: 530, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_CODE.ALBUM]: {
    name: '相册',
    component: Album,
    code: APP_CODE.ALBUM,
    icon: 'klx.pro.6f66375e9c7d528f20c5fa57b3ad1ea0.svg',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 8, left: 10 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.EDITOR]: {
    name: '编辑器',
    component: Editor,
    icon: 'klx.pro.a0745138b76ad9e1d99e2489297e8131.svg',
    code: APP_CODE.EDITOR,
    modalProps: {
      dragHeight: 30,
      toolPosition: { top: 6, left: -4 },
      toolStyle: { transform: 'scale(0.8)' },
      defaultParams: { width: 1200, height: 730, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_CODE.READER]: {
    name: '阅读',
    component: Reader,
    icon: 'klx.pro.4bc44b31f4d00e5192b7deabf6682cf1.svg',
    code: APP_CODE.READER,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      defaultParams: { width: 1020, height: 530, offsetX: 60, offsetY: 60 },
    },
  },
  [APP_CODE.DIARY]: {
    name: '日记',
    component: Diary,
    icon: 'klx.pro.fe12a2f0188beb3fce602354664551ab.svg',
    code: APP_CODE.DIARY,
    modalProps: {
      dragHeight: 20,
      toolPosition: { top: 11, left: 18 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.LOGGER]: {
    name: '日志',
    component: Logger,
    icon: 'klx.pro.c2a2a3a8b3e4ddfea309d3e292531d82.svg',
    code: APP_CODE.LOGGER,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      defaultParams: { width: 1220, height: 630, offsetX: 40, offsetY: 40 },
    },
  },
  [APP_CODE.SETTING]: {
    name: '系统偏好设置',
    icon: 'klx.pro.38008433a4ff3ef788a5baae4f077483.svg',
    component: Setting,
    code: APP_CODE.SETTING,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 14, left: 14 },
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },

  [APP_CODE.USER]: {
    name: '用户管理',
    component: User,
    code: APP_CODE.USER,
    icon: 'klx.pro.d1fb923369fb7b28217133738e37ba2f.svg',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 14, left: 14 },
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },
};
