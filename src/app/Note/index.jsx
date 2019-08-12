import React, { useRef } from 'react';

import { ChatLayout } from '@components';

import scss from './index.module.scss';
import EditBox from './EditBox';
import ListBox from './ListBox';
import Header from './Header';
import Menu from './Menu';

const Note = (props) => {
  return (
    <ChatLayout 
      header={<Header/>}
      list={<ListBox />}
      edit={<EditBox />}
      menu={<Menu />}
    />
  );
}

export default Note;
