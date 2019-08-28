import React, { useRef } from 'react';
import { NoteLayout } from '@components';

import scss from './index.module.scss';
import SearchList from './SearchList';
import StoreProvider from './store';
import WorkArea from './WorkArea';
import TagList from './TagList';
import Header from './Header';
import Footer from './Footer';

const Note = (props) => {
  return (
    <StoreProvider>
      <NoteLayout
        searchList={<SearchList />}
        workArea={<WorkArea />}
        tagList= {<TagList />}
        header={<Header/>}
        footer={<Footer />}
      />
    </StoreProvider>
  );
}

export default Note;
