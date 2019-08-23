import React, { useRef } from 'react';
import { NoteLayout } from '@components';

import scss from './index.module.scss';
import StoreProvider from './store';
import Console from './Console';
import Header from './Header';
import Work from './Work';
import List from './List';
import Side from './Side';

const Note = (props) => {
  return (
    <StoreProvider>
      <NoteLayout
        list={<List />}
        work={<Work />}
        side= {<Side />}
        header={<Header/>}
        console={<Console />}
      />
    </StoreProvider>
  );
}

export default Note;
