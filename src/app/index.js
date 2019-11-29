// import Tag from './Tag';
import Note from './Note';
import Album from './Album';
import Editor from './Editor';
import Article from './Article';

export default [
  {
    name: '相册',
    key: 'album',
    component: Album,
    defaultOpen: false,
    icon: 'icon-banjixiangce',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, left: 15 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  {
    name: '编辑器',
    key: 'editor',
    component: Editor,
    defaultOpen: true,
    icon: 'icon-daima',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, right: 15 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  {
    name: '文章',
    icon: 'icon-wenzhang',
    key: 'article',
    defaultOpen: false,
    component: Article,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      toolClassName: 'article-modal-tool',
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  {
    name: '笔记',
    key: 'note',
    component: Note,
    icon: 'icon-jilu',
    defaultOpen: false,
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, left: 5 },
      defaultParams: { width: 980, height: 500, offsetX: 50, offsetY: 50 },
    },
  },
  // {
  //   name: '标签',
  //   icon: 'icon-biaoqian1',
  //   key: 'tag',
  //   path: '/tag',
  //   defaultUrl: '/tag',
  //   component: Tag
  // },
];
