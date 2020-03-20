import Diary from './Diary';
import Album from './Album';
import Editor from './Editor';
import Article from './Article';
import { APP_CODE } from '@config/consts';

export default {
  album: {
    name: '相册',
    component: Album,
    code: APP_CODE.ALBUM,
    icon: 'icon-banjixiangce',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, left: 15 },
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
      toolPosition: { top: 12, left: 10 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  article: {
    name: '文章',
    component: Article,
    icon: 'icon-wenzhang',
    code: APP_CODE.ARTICLE,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 16, left: 16 },
      toolClassName: 'article-modal-tool',
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  diary: {
    name: '日记',
    component: Diary,
    icon: 'icon-biji',
    code: APP_CODE.DIARY,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 11, left: 11 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
};
