import React, { useRef } from 'react';

import { ChatLayout } from '@components';

import scss from './index.module.scss';
import StoreProvider from './store';
import EditBox from './EditBox';
import ListBox from './ListBox';
import Header from './Header';
import Menu from './Menu';

const Note = (props) => {
  return (
    <StoreProvider>
      <ChatLayout 
        header={<Header/>}
        list={<ListBox />}
        edit={<EditBox />}
        menu={<Menu />}
      />
    </StoreProvider>
  );
}

export default Note;
