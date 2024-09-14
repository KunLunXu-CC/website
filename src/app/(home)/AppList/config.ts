import AI from './AI';
import User from './User';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Setting from './Setting';
import Monitoring from './Monitoring';
import { APP_SETTING, APP_CODE } from '@/config/constants';

// 图标来自 figma
const config = {
  [APP_CODE.AI]: {
    ...APP_SETTING[APP_CODE.AI],
    component: AI,
    modalProps: {
      dragHeight: 30,
      defaultParams: { width: 1000, height: 530, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_CODE.ALBUM]: {
    ...APP_SETTING[APP_CODE.ALBUM],
    component: Album,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.EDITOR]: {
    ...APP_SETTING[APP_CODE.EDITOR],
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
  // ---
  [APP_CODE.READER]: {
    ...APP_SETTING[APP_CODE.READER],
    component: Reader,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1020, height: 530, offsetX: 60, offsetY: 60 },
    },
  },
  [APP_CODE.DIARY]: {
    ...APP_SETTING[APP_CODE.DIARY],
    component: Diary,
    modalProps: {
      dragHeight: 20,
      tool: { top: 11, left: 18 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.MONITORING]: {
    ...APP_SETTING[APP_CODE.MONITORING],
    component: Monitoring,
    modalProps: {
      isPure: true,
      dragHeight: 40,
      defaultParams: { width: 900, height: 530, offsetX: 200, offsetY: 100 },
    },
  },
  [APP_CODE.SETTING]: {
    ...APP_SETTING[APP_CODE.SETTING],
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
  [APP_CODE.USER]: {
    ...APP_SETTING[APP_CODE.USER],
    component: User,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },
};

export default config;
