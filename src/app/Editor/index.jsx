import React, {
  useEffect,
} from 'react';
import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import Work from './Work';
import Tips from './Tips';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import Preview from './Preview';
import scss from './index.module.scss';

import { useDispatch } from 'react-redux';

// activity bar、 side bar

const useStateHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'editor/initData' });
  }, []);
};

export default () => {
  useStateHook();
  return (
    <div className={scss.editor}>
      <Header/>
      <div className={scss['editor-body']}>
        <ActivityBar/>
        <SideBar/>
        <Work/>
        <Preview/>
      </div>
      <Footer/>
      <Tips/>
      <Modal/>
    </div>
  );
};
