import React, {
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Markdown, Scroll } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const read = useSelector(state => _.get(state, 'article.read'));

  const onScroll = scrollHeight => {
    dispatch({ type: 'article/setRead', read: { scrollHeight } });
  };

  const onTocParsed = ({ parseData }) => {
    dispatch({ type: 'article/setRead', read: { toc: parseData } });
  };

  useEffect(() => {
    dispatch({
      type: 'article/setRead',
      read: { scrollHeight: 0 },
    });
  }, [_.get(read, 'article.id')]);

  return { read, onTocParsed, onScroll };
};

export default () => {
  const state = useStateHook();

  return (
    <Scroll
      className={scss.scroll}
      onScroll={state.onScroll}
      scrollHeight={_.get(state, 'read.scrollHeight') || 0}>
      <Markdown onTocParsed={state.onTocParsed}>
        {_.get(state, 'read.article.content') || ''}
      </Markdown>
    </Scroll>
  );
};
