import React from 'react';
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
    <div className={scss['search-page']}>
      {
        mockdata.map((v, index) => (
          <Item align={index % 2 !== 0 ? 'right' : 'left'}/>
        ))
      }
    </div>
  );
}
