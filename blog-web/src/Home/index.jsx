import React, { Fragment } from 'react';
import scss from './index.module.scss';
import Dock from './subpage/Dock';
import Desktop from './subpage/Desktop';

const Home = (props) => {
  return (
    <Fragment>
      <Dock/>
      <Desktop/>
    </Fragment>
  );
}

export default Home;
