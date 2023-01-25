import Work from './Work';
import Tips from './Tips';
import Modal from './Modal';
import Preview from './Preview';
import SideBar from './SideBar';
import scss from './index.module.scss';
import ActivityBar from './ActivityBar';

import { actions } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInitEditorDataQuery } from '@store/graphql';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { data: initEditorData } = useInitEditorDataQuery();

  useEffect(() => {
    dispatch(actions.editor.setFolders(initEditorData?.folders.list ?? []));
    dispatch(actions.editor.setArticles(initEditorData?.articles.list ?? []));
  }, [dispatch, initEditorData]);
};

export default () => {
  useStateHook();
  return (
    <div className={scss.editor}>
      <div className={scss.header} />
      <div className={scss['editor-body']}>
        <ActivityBar />
        <SideBar />
        <Work />
        <Preview />
      </div>
      <div className={scss.footer} />
      <Tips />
      <Modal />
    </div>
  );
};
