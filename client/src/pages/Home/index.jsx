import React, { Fragment } from 'react';

import DockList from './subpage/DockList/index';
import AppList from './subpage/AppList/index';
import Desktop from './subpage/Desktop/index';

const Home = (props) => {
  return (
    <Fragment>
      <DockList/>
      <Desktop/>
      <AppList />
    </Fragment>
  );
}

export default Home;
