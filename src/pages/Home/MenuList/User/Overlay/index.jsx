import React from 'react';
import Footer from './Footer';
import UserInfo from './UserInfo';
import scss from './index.module.scss';

export default () => (
  <div className={scss.overlay}>
    <UserInfo/>
    <Footer/>
  </div>
);
