// import Tag from './Tag';
// import Diary from './Diary';
// import Album from './Album';
// import Editor from './Editor';
// import Article from './Article';

export default [
  {
    name: '相册',
    key: 'album',
    component: () => (11111111),
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
    component: () => ('Editor'),
    icon: 'icon-daima',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 15, right: 15 },
      defaultParams: { width: 1000, height: 530, offsetX: 50, offsetY: 50 },
    },
  },
  {
    name: '文章',
    key: 'article',
    component: () => ('Article'),
    icon: 'icon-wenzhang',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 10, left: 10 },
      toolClassName: 'article-modal-tool',
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
    },
  },
  {
    name: '日记',
    key: 'diary',
    component: () => ('Diary'),
    icon: 'icon-biji',
    modalProps: {
      dragHeight: 40,
      toolPosition: { top: 20, left: 20 },
      defaultParams: { width: 1220, height: 630, offsetX: 50, offsetY: 50 },
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
