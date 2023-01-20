import scss from './index.module.scss';

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';
import { VariableContainer, Markdown, Icon } from '@kunlunxu/brick';

export default () => {
  const dispatch = useDispatch();

  // 预览文章
  const article = useSelector((state) => {
    const { preview, articles, works } = state.editor;
    return works.find((v) => v.articleId === preview)
      ? ({ ...articles[preview] } ?? {})
      : {};
  });

  // 关闭
  const handleClose = () => dispatch({
    type: 'editor/setPreview',
    preview: void 0,
  });

  // 当缩小到 50 则关闭
  const handleResize = ({ width }) => {
    width < 50 && handleClose();
  };

  // Markdown 配置参数
  const options = useMemo(() => ({
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

  return (
    article.name ? (
      <VariableContainer
        layout
        onResize={handleResize}
        operationList={['left']}
        margin={{ right: '20%' }}
        className={scss.container}
        style={{ height: '100%' }}
        constraintSize={{ width: 0 }}
        defaultParams={{ width: 560 }}>
        <div className={scss.preview}>
          <div className={scss['preview-header']}>
            {article.name}
            <Icon
              type="icon-guanbi6"
              onClick={handleClose}
            />
          </div>
          <Markdown
            options={options}
            className={scss['preview-body']}>
            {article.content || ''}
          </Markdown>
        </div>
      </VariableContainer>
    ) : null
  );
};
