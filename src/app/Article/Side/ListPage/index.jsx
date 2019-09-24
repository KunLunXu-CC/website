import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

const mock = [
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg', },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png', },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg', },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg', },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png', },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg', },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg', },
  { img: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.3.2/img/other/sakura.md.png', },
  { img: 'https://view.moezx.cc/images/2019/06/11/74751807_angel.jpg', },
];

export default () => {
  return (
    <div className={scss['list']}>
      {mock.map((v, index) => (<Item key={index} data={v}/>))}
    </div>
  );
}
