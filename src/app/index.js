import AI from './AI';
import User from './User';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Setting from './Setting';
import Monitoring from './Monitoring';
import { APP_CODE } from '@config/constants';

// 图标来自 figma
export default {
  [APP_CODE.AI]: {
    name: 'AI',
    component: AI,
    icon: 'klx.pro.abf8398cdc33310c6bf5b439a890da0a.svg',
    code: APP_CODE.AI,
    modalProps: {
      dragHeight: 30,
      defaultParams: { width: 1000, height: 530, offsetX: 100, offsetY: 40 },
    },
  },
  [APP_CODE.ALBUM]: {
    name: '相册',
    component: Album,
    code: APP_CODE.ALBUM,
    icon: 'klx.pro.a0200bdbf017134abc741194fd98faf8.svg',
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.EDITOR]: {
    name: '编辑器',
    component: Editor,
    icon: 'klx.pro.510a9a0f9a06596a9debe051979ae81c.svg',
    code: APP_CODE.EDITOR,
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
  [APP_CODE.READER]: {
    name: '阅读',
    component: Reader,
    icon: 'klx.pro.626304a5235e36b3bddf04e2f688b5df.svg',
    code: APP_CODE.READER,
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 1020, height: 530, offsetX: 60, offsetY: 60 },
    },
  },
  [APP_CODE.DIARY]: {
    name: '日记',
    component: Diary,
    icon: 'klx.pro.271ab305dd478bb0332ddc5db76219fc.svg',
    code: APP_CODE.DIARY,
    modalProps: {
      dragHeight: 20,
      tool: { top: 11, left: 18 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  [APP_CODE.MONITORING]: {
    name: '鉴查院',
    component: Monitoring,
    icon: 'klx.pro.446ad243a8ff5ab63e1c774bbea5db93.svg',
    code: APP_CODE.MONITORING,
    modalProps: {
      isPure: true,
      dragHeight: 40,
      defaultParams: { width: 1220, height: 630, offsetX: 240, offsetY: 140 },
    },
  },
  [APP_CODE.SETTING]: {
    name: '系统偏好设置',
    icon: 'klx.pro.4a3046239475ce8e5e87c1f056d2b973.svg',
    component: Setting,
    code: APP_CODE.SETTING,
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
    name: '用户管理',
    component: User,
    code: APP_CODE.USER,
    icon: 'klx.pro.d1fb923369fb7b28217133738e37ba2f.svg',
    modalProps: {
      dragHeight: 40,
      defaultParams: { width: 800, height: 500, offsetX: 100, offsetY: 100 },
    },
  },
};
