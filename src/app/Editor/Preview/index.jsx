import React from 'react';
import scss from './index.module.scss';

import { VariableContainer, Markdown } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';

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

  // Markdown 配置参数
  const options = React.useMemo(() => ({
    overrides: {
      img: {
        component: props => (<img src={ /http/.test(props.src)
          ? props.src
          : `${SERVICE_STATIC_IMAGE_URL}${props.src}`
        }/>),
      },
    },
  }), []);

  return { onResize, article, options };
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
        style={{ height: '100%', left: 0 }}>
        <div className={scss.preview}>
          <div className={scss['preview-header']}>
            {state.article.name}
          </div>
          <Markdown className={scss['preview-body']} options={state.options}>
            {state.article.content || ''}
          </Markdown>
        </div>
      </VariableContainer> : null
  );
};
