import Work from './Workspace';
import Modals from './Modals';
import SideBar from './SideBar';
import scss from './index.module.scss';
import ActivityBar from './ActivityBar';

import { memo } from 'react';

const Editor = () => (
  <div className={scss.editor}>
    <div className={scss.header} />
    <div className={scss['editor-body']}>
      <ActivityBar />
      <SideBar />
      <Work />
    </div>
    <div className={scss.footer} />
    <Modals />
  </div>
);

export default memo(Editor);
