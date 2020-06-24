import React from 'react';
import Menu from './Menu';
import Editor from './Editor';
import Header from './Header';
import Content from './Content';
import scss from './index.module.scss';

import { APP_CODE, BOOLEAN } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { editor, writable } = useSelector(state => {
    const { read: { editor }, user: { role: { auth } } } = state;
    const writable = auth.find(v => v.code === APP_CODE.READ) ?. writable;
    return { editor, writable };
  });

  const onKeyDown = React.useCallback(event => {
    if ([
      !event.ctrlKey,
      event.keyCode !== 192,
      writable === BOOLEAN.FALSE,
    ].includes(true)) {
      return false;
    }
    dispatch({
      type: 'read/setEditor',
      editor: {
        current: null,
        show: !editor.show,
      },
    });
  }, [editor.show]);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
};

export default () => {
  useStateHook();

  return (
    <div className={scss.read}>
      <Header />
      <div className={scss.body}>
        <Menu />
        <div className={scss.main}>
          <Content />
          <Editor />
        </div>
      </div>
    </div>
  );
};
