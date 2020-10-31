import Draw from './Draw';
import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Reader from './Reader';
import Logger from './Logger';
import Datasetsfrom from './Datasetsfrom';
import { APP_CODE } from '@config/consts';

export default {
  album: {
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
  editor: {
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
  read: {
    name: '阅读',
    component: Reader,
    icon: 'icon-wenzhang',
    code: APP_CODE.READ,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 16, left: 16 },
      defaultParams: { width: 1220, height: 630, offsetX: 60, offsetY: 60 },
    },
  },
  diary: {
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
  datasetsfrom: {
    name: '数据字典',
    icon: 'icon-zidian',
    component: Datasetsfrom,
    code: APP_CODE.DATASETSFROM,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 11, left: 11 },
      defaultParams: { width: 1220, height: 630, offsetX: 40, offsetY: 40 },
    },
  },
  draw: {
    name: '绘图',
    icon: 'icon-huitu',
    component: Draw,
    code: APP_CODE.DRAW,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 17, right: 11 },
      defaultParams: { width: 1220, height: 630, offsetX: 40, offsetY: 40 },
    },
  },
  logger: {
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
};
