import AI from './AI';
import User from './User';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Setting from './Setting';
import Monitoring from './Monitoring';

import { APP_SETTING } from '@config/constants';

// 图标来自 figma
export default {
  [APP_SETTING.AI.code]: {
    ...APP_SETTING.AI,
    component: AI,
    modalProps: {
      dragHeight: 30,
      defaultParams: { width: 1000, height: 530, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_SETTING.ALBUM.code]: {
    ...APP_SETTING.ALBUM,
    component: Album,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_SETTING.EDITOR.code]: {
    ...APP_SETTING.EDITOR,
    component: Editor,
    modalProps: {
      tool: {
        top: 11,
        left: 8,
        size: 10,
        width: 50,
      },
      dragHeight: 30,
      defaultParams: { width: 1200, height: 730, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_SETTING.READER.code]: {
    ...APP_SETTING.READER,
    component: Reader,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1020, height: 530, offsetX: 60, offsetY: 60 },
    },
  },
  [APP_SETTING.DIARY.code]: {
    ...APP_SETTING.DIARY,
    component: Diary,
    modalProps: {
      dragHeight: 20,
      tool: { top: 11, left: 18 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_SETTING.MONITORING.code]: {
    ...APP_SETTING.MONITORING,
    component: Monitoring,
    modalProps: {
      isPure: true,
      dragHeight: 40,
      defaultParams: { width: 1220, height: 630, offsetX: 240, offsetY: 140 },
    },
  },
  [APP_SETTING.SETTING.code]: {
    ...APP_SETTING.SETTING,
    component: Setting,
    modalProps: {
      tool: {
        top: 18,
        left: 14,
      },
      dragHeight: 40,
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },

  [APP_SETTING.USER.code]: {
    ...APP_SETTING.USER,
    component: User,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },
};
