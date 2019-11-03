import React from 'react';
import { Scroll } from 'qyrc';
import scss from './index.module.scss';

import Item from './Item';

const mockdata = [
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
  { time: '', title: '', views: '', comments: '', tag: '', desc: '' },
];

export default () => {
  return (
    <Scroll className={scss['list']}>
      {
        mockdata.map((v, index) => (
          <Item key={index} align={index % 2 !== 0 ? 'right' : 'left'}/>
        ))
      }
      <br/>
    </Scroll>
  );
}
