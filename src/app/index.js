import Diary from './Diary';
import Album from './Album';
// import Editor from './Editor';
import Article from './Article';

export default {
  album: {
    name: '相册',
    code: 'album',
    component: Album,
    icon: 'icon-banjixiangce',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, left: 15 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  editor: {
    name: '编辑器',
    code: 'editor',
    component: () => ('Editor'),
    icon: 'icon-daima',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, right: 15 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  article: {
    name: '文章',
    code: 'article',
    component: Article,
    icon: 'icon-wenzhang',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      toolClassName: 'article-modal-tool',
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  diary: {
    name: '日记',
    code: 'diary',
    component: Diary,
    icon: 'icon-biji',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 20, left: 20 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
};
