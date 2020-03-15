import React, {
  useEffect,
} from 'react';
import Side from './Side';
import Menu from './Menu';
import Work from './Work';
import Tips from './Tips';
import Header from './Header';
import Footer from './Footer';
import scss from './index.module.scss';

import { VariableBlock } from 'qyrc';
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
      <div className={scss['editor-header']}><Header/></div>
      <div className={scss['editor-body']}>
        <div className={scss['editor-body-side']}><Side/></div>
        <VariableBlock
          margin={{ right: '20%' }}
          operationList={['right']}
          style={{ height: '100%' }}
          constraintSize={{ width: 4 }}
          className={scss['editor-body-menu']} >
          <Menu/>
        </VariableBlock>
        <div className={scss['editor-body-work']}><Work/></div>
      </div>
      <div className={scss['editor-footer']}><Footer /></div>
      <Tips/>
    </div>
  );
};
