import Tag from './Tag';
import Note from './Note';
import Article from './Article';

export default [
  {
    name: '文章',
    icon: 'icon-wenzhang',
    code: 'article',
    exact: true,
    path: '/article',
    url: '/article',
    app: Article
  }, {
    name: '笔记',
    icon: 'icon-jilu',
    code: 'note',
    exact: true,
    path: '/note',
    url: '/note',
    app: Note
  }, {
    name: '标签',
    icon: 'icon-biaoqian1',
    code: 'tag',
    exact: true,
    path: '/tag',
    url: '/tag',
    app: Tag
  }
];
