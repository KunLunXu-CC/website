import React, {
  useEffect,
} from 'react';
import Item from './Item';
import NoMore from './NoMore';
import scss from './index.module.scss';

import { Empty } from 'antd';
import { Scroll } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const articles = useSelector(
    state => _.get(state, 'article.articles') || []
  );

  useEffect(() => {
    dispatch({ type: 'article/getArticles' });
  }, []);

  return { articles };
};

export default () => {
  const state = useStateHook();

  return (
    <Scroll className={scss.scroll}>
      {state.articles.length > 0 ?
        state.articles.map((value, index) => (
          <Item
            data={value}
            key={value.id}
            align={index % 2 !== 0 ? 'right' : 'left'}
          />
        )) :
        <Empty/>
      }
      {state.articles.length > 0 ?
        <NoMore/> : null
      }
      <br/><br/>
    </Scroll>
  );
};
