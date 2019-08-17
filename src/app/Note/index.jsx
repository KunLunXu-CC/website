import React, { useRef } from 'react';

import { ChatLayout } from '@components';

import scss from './index.module.scss';
import StoreProvider from './store';
import EditBlock from './EditBlock';
import ListBlock from './ListBlock';
import Header from './Header';
import Menu from './Menu';

const Note = (props) => {
  return (
    <StoreProvider>
      <ChatLayout
        header={<Header/>}
        list={<ListBlock />}
        edit={<EditBlock />}
        menu={<Menu />}
      />
    </StoreProvider>
  );
}

export default Note;
