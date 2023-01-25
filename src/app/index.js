import User from './User';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Logger from './Logger';
import Setting from './Setting';
import { APP_CODE } from '@config/consts';

export default {
  [APP_CODE.ALBUM]: {
    name: '相册',
    component: Album,
    code: APP_CODE.ALBUM,
    icon: 'icon-banjixiangce',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 8, left: 10 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.EDITOR]: {
    name: '编辑器',
    component: Editor,
    icon: 'icon-daima',
    code: APP_CODE.EDITOR,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 8, left: 2 },
      defaultParams: { width: 1200, height: 730, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_CODE.READER]: {
    name: '阅读',
    component: Reader,
    icon: 'icon-wenzhang',
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
    icon: 'icon-biji',
    code: APP_CODE.DIARY,
    modalProps: {
      dragHeight: 20,
      toolPosition: { top: 11, left: 18 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.LOGGER]: {
    name: '日志',
    icon: 'icon-rizhichaxun',
    component: Logger,
    code: APP_CODE.LOGGER,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      defaultParams: { width: 1220, height: 630, offsetX: 40, offsetY: 40 },
    },
  },
  [APP_CODE.SETTING]: {
    name: '系统偏好设置',
    icon: 'icon-renwucopy',
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
    icon: 'icon-renwucopy',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 14, left: 14 },
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },
};
