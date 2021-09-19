import React from 'react';
import Header from './Header';
import Content from './Content';
import classNames from 'classnames';
import scss from './index.module.scss';

import { useSelector } from 'react-redux';

const useStateHook = () => {
  const { article } = useSelector((state) => state.reader.detail);

  // 最外层 className
  const className = React.useMemo(() => classNames(
    scss.detail,
    { [scss.show]: article },
  ), [article]);

  return { className, article };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={state.className}>
      <Header article={state.article} />
      <div className={scss.body}>
        <Content data={state.article?.content} />
      </div>
    </div>
  );
};
