import React, {
  useEffect,
} from 'react';
import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Tips from './Tips';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import Preview from './Preview';
import scss from './index.module.scss';

import { useDispatch } from 'react-redux';

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
        <Side/>
        <Menu/>
        <Work/>
        <Preview/>
      </div>
      <Footer/>
      <Tips/>
      <Modal/>
    </div>
  );
};
