import React, { Fragment } from 'react';

import Dock from './subpage/Dock';
import AppList from './subpage/AppList';
import Desktop from './subpage/Desktop';

const Home = (props) => {
  return (
    <Fragment>
      <Dock/>
      <Desktop/>
      <AppList />
    </Fragment>
  );
}

export default Home;
