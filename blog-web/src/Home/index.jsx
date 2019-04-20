import React from 'react';
import scss from './index.module.scss';
import Dock from './subpage/Dock';

const Home = (props) => {
  return (
    <div className={scss['home']}>
      <Dock/>
      home
    </div>
  );
}

export default Home;
