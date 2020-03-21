import React, {
  useMemo,
  useEffect,
} from 'react';
import scss from './index.module.scss';

import { Markdown, Scroll } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  const read = useSelector(state => _.get(state, 'article.read'));

  const onScroll = scrollHeight => {
    dispatch({ type: 'article/setRead', read: { scrollHeight } });
  };

  const onTocParsed = ({ parseData }) => {
    dispatch({ type: 'article/setRead', read: { toc: parseData } });
  };

  // markdonw 配置参数
  const options = useMemo(() => ({
    overrides: {
      img: {
        component: props => {
          const imgSrc = /^http/i.test(props.src)
            ? props.src
            : `${SERVICE_STATIC_IMAGE_URL}${props.src}`;
          return (
            <img src={imgSrc} alt={props.all}/>
          );
        },
      },
    },
  }), []);

  useEffect(() => {
    dispatch({
      type: 'article/setRead',
      read: { scrollHeight: 0 },
    });
  }, [_.get(read, 'article.id')]);

  return { read, onTocParsed, onScroll, options };
};

export default () => {
  const state = useStateHook();

  return (
    <Scroll
      className={scss.scroll}
      onScroll={state.onScroll}
      scrollHeight={_.get(state, 'read.scrollHeight') || 0}>
      <Markdown
        options={state.options}
        onTocParsed={state.onTocParsed}>
        {_.get(state, 'read.article.content') || ''}
      </Markdown>
    </Scroll>
  );
};
