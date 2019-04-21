import Note from './Note';

export default [
  {
    name: '文章',
    icon: 'icon-wenzhang',
    code: 'article',
    exact: true,
    path: '/article',
    app: () => (<div>文章</div>) 
  }, {
    name: '笔记',
    icon: 'icon-jilu',
    code: 'note',
    exact: true,
    path: '/note',
    app: Note
  }, {
    name: '标签',
    icon: 'icon-biaoqian1',
    code: 'tag',
    exact: true,
    path: '/tag',
    app: () => (<div>标签</div>) 
  }
];
