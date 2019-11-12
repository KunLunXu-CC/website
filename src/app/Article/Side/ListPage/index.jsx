import React from 'react';
import { Scroll } from 'qyrc';

import Item from './Item';
import scss from './index.module.scss';

const mock = [
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg' },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png' },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg' },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg' },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png' },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg' },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg' },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png' },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg' },
];

export default () => (
  <Scroll className={scss.list}>
    {mock.map((value, index) => (<Item key={index} data={value}/>))}
  </Scroll>
);
