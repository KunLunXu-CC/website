import React from 'react';
import Footer from './Footer';
import UserInfo from './UserInfo';
import scss from './index.module.scss';

export default props => (
  <div
    className={scss.overlay}
    onMouseLeave={props.onVisibleChange.bind(null, false)}>
    <UserInfo/>
    <Footer/>
  </div>
);
