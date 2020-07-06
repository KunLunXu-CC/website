import React from 'react';
import scss from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { VariableContainer, Markdown, Scroll } from 'qyrc';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 预览内容
  const article = useSelector(state => {
    const { preview, articles } = state.editor;
    return articles[preview] ?? {};
  });

  const onClose = () => {
    dispatch({
      type: 'editor/setPreview',
      preview: void 0,
    });
  };

  const onResize = ({ width }) => {
    width < 50 && onClose();
  };

  return { onResize, article };
};

export default () => {
  const state = useStateHook();
  return (
    state.article.name ?
      <VariableContainer
        operationList={['left']}
        margin={{ right: '20%' }}
        onResize={state.onResize}
        className={scss.container}
        constraintSize={{ width: 0 }}
        defaultParams={{ width: 560 }}
        style={{ height: '100%', transform: 'translate(0px, 0px)' }}>
        <div className={scss.preview}>
          <div className={scss['preview-header']}>
            {state.article.name}
          </div>
          <Scroll  className={scss['preview-body']}>
            <Markdown>
              {state.article.content || ''}
            </Markdown>
          </Scroll>
        </div>
      </VariableContainer> : null
  );
};
