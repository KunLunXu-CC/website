import Tag from './Tag';
import Note from './Note';
import Article from './Article';

export default [
  {
    name: '文章',
    icon: 'icon-wenzhang',
    code: 'article',
    path: '/article',
    defaultUrl: '/article',
    component: Article
  }, {
    name: '笔记',
    icon: 'icon-jilu',
    code: 'note',
    path: '/note',
    defaultUrl: '/note',
    component: Note
  }, {
    name: '标签',
    icon: 'icon-biaoqian1',
    code: 'tag',
    path: '/tag',
    defaultUrl: '/tag',
    component: Tag
  }
];
