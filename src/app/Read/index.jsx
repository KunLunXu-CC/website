import React from 'react';
import Menu from './Menu';
import Content from './Content';
import Editor from './Editor';
import Header from './Header';
import scss from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const editor = useSelector(state => state.read.editor);

  const onKeyDown = React.useCallback(event => {
    if (!event.ctrlKey || event.keyCode !== 192) {
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
