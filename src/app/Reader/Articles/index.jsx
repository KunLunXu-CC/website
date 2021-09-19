import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { selectedKey, articles } = useSelector((state) => ({
    ...state.reader.menu,
    articles: state.reader.articles,
  }));

  React.useEffect(() => {
    dispatch({ type: 'reader/getArticles' });
  }, [selectedKey]);

  return { articles };
};

export default () => {
  const state = useStateHook();
  return  (
    <div className={scss.articles}>
      {state.articles.map((v, index) => (
        <Item
          data={v}
          key={v.id}
          thumbPosition={index % 2 === 1 ? 'left' : 'right'}
        />
      ))}
    </div>
  );
};
