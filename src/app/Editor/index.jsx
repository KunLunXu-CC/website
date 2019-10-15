import React, { useEffect } from 'react';
import StoreProvider from './store';

import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Header from './Header';

import scss from './index.module.scss';

export default () => {
  return (
    <StoreProvider>
      <div className={scss['editor']}>
        <div className={scss['editor-side']}><Side/></div>
        <div className={scss['editor-body']}>
          <div className={scss['editor-body-header']}><Header/></div>
          <div className={scss['editor-body-middle']}>
            <div className={scss['editor-body-middle-menu']}><Menu/></div>
            <div className={scss['editor-body-middle-work']}><Work/></div>
          </div>
        </div>
      </div>
    </StoreProvider>
  );
};
