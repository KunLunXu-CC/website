import React, { useRef } from 'react';
import { ThreeColumnLayout } from 'qyrc';

import scss from './index.module.scss';
import Content from './Content';
import Header from './Header';
import Menu from './Menu';

const Note = (props) => {
  return (
    <ThreeColumnLayout
      className={scss['note']}
      content={<Content/>}
      header={<Header/>}
      menu={<Menu/>}
    />
  );
}

export default Note;
