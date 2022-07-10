import React from 'react';
import scss from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { VariableContainer, Markdown, Icon } from '@kunlunxu/brick';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 预览文章
  const article = useSelector((state) => {
    const { preview, articles, works } = state.editor;
    return works.find((v) => v.article === preview)
      ? ({ ...articles[preview] } ?? {})
      : {};
  });

  // 关闭
  const onClose = () => dispatch({
    type: 'editor/setPreview',
    preview: void 0,
  });

  // 当缩小到 50 则关闭
  const onResize = ({ width }) => {
    width < 50 && onClose();
  };

  // Markdown 配置参数
  const options = React.useMemo(() => ({
    overrides: {
      img: {
        component: (props) => (
          <img src={/http/.test(props.src)
            ? props.src
            : `${SERVICE_STATIC_IMAGE_URL}${props.src}`
          }
          />
        ),
      },
    },
  }), []);

  return { onResize, article, options, onClose };
};

export default () => {
  const state = useStateHook();
  return (
    state.article.name ? (
      <VariableContainer
        layout
        operationList={['left']}
        margin={{ right: '20%' }}
        onResize={state.onResize}
        className={scss.container}
        style={{ height: '100%' }}
        constraintSize={{ width: 0 }}
        defaultParams={{ width: 560 }}>
        <div className={scss.preview}>
          <div className={scss['preview-header']}>
            {state.article.name}
            <Icon
              type="icon-guanbi6"
              onClick={state.onClose}
            />
          </div>
          <Markdown
            className={scss['preview-body']}
            options={state.options}>
            {state.article.content || ''}
          </Markdown>
        </div>
      </VariableContainer>
    ) : null
  );
};
