import React, {
  useEffect,
} from 'react';
import ActivityBar from './ActivityBar';
import SideBar from './SideBar';
import Work from './Work';
import Tips from './Tips';
import Modal from './Modal';
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
      <div className={scss.header}/>
      <div className={scss['editor-body']}>
        <ActivityBar/>
        <SideBar/>
        <Work/>
        <Preview/>
      </div>
      <div className={scss.footer}/>
      <Tips/>
      <Modal/>
    </div>
  );
};
