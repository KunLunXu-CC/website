import React, { useRef } from 'react';
import { NoteLayout } from '@components';

import scss from './index.module.scss';
import StoreProvider from './store';
import Console from './Console';
import Header from './Header';
import WorkArea from './WorkArea';
import SearchList from './SearchList';
import TagList from './TagList';

const Note = (props) => {
  return (
    <StoreProvider>
      <NoteLayout
        searchList={<SearchList />}
        workArea={<WorkArea />}
        tagList= {<TagList />}
        header={<Header/>}
        console={<Console />}
      />
    </StoreProvider>
  );
}

export default Note;
