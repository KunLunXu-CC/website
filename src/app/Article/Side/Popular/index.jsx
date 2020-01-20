import React, {
  useEffect,
} from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Scroll, Icon } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const articleTops = useSelector(state => _.get(state, 'article.articleTops'));

  useEffect(() => {
    dispatch({ type: 'article/getArticleTops' });
  }, []);

  return { articleTops };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.popular}>
      <div className={scss.title}>
        <Icon type="icon-remen" /> TOP 10
      </div>
      <Scroll className={scss.scroll}>
        {state.articleTops.map((value, index) => (
          <Item key={index} data={value}/>
        ))}
      </Scroll>
    </div>
  );
};
