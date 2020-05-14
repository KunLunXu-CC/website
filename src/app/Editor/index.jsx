import React, {
  useEffect,
  useCallback,
} from 'react';
import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Tips from './Tips';
import Header from './Header';
import Footer from './Footer';
import scss from './index.module.scss';

import { VariableContainer } from 'qyrc';
import { useDispatch } from 'react-redux';

// 菜单最小宽度
const MENU_MIN_WIDTH = 4;

const useStateHook = () => {
  const dispatch = useDispatch();

  const onResize = useCallback(({ width }) => {
    dispatch({
      type: 'editor/setMenu',
      menu: { collapsed: MENU_MIN_WIDTH === width },
    });
  }, []);

  useEffect(() => {
    dispatch({ type: 'editor/initData' });
  }, []);

  return { onResize };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.editor}>
      <div className={scss['editor-header']}><Header/></div>
      <div className={scss['editor-body']}>
        <div className={scss['editor-body-side']}><Side/></div>
        <VariableContainer
          margin={{ right: '20%' }}
          operationList={['right']}
          onResize={state.onResize}
          style={{ height: '100%' }}
          className={scss['editor-body-menu']}
          constraintSize={{ width: MENU_MIN_WIDTH }}>
          <Menu/>
        </VariableContainer>
        <div className={scss['editor-body-work']}><Work/></div>
      </div>
      <div className={scss['editor-footer']}><Footer/></div>
      <Tips/>
    </div>
  );
};
