import React, { Fragment } from 'react';

import DockList from './DockList/index';
import AppList from './AppList/index';
import Desktop from './Desktop/index';

const Home = () => {
  return (
    <Fragment>
      <DockList/>
      <Desktop/>
      <AppList />
    </Fragment>
  );
}

export default Home;
