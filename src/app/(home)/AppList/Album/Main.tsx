import { FC, memo } from 'react';

import Body from './Body';
import Side from './Side';
import Upload from './Upload';
import scss from './index.module.scss';
import useAlbumSearch from './hooks/useAlbumSearch';

const Album: FC = () => {
  useAlbumSearch();

  return (
    <div className={scss.layout}>
      <div className={scss['layout-side']}>
        <Side />
      </div>
      <div className={scss['layout-body']}>
        <Body />
        <Upload />
      </div>
    </div>
  );
};

export default memo(Album);
