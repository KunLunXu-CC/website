
import Markdown from '@/components/Markdown';

import { actions } from '@/store';
import { getOssUrl } from '@/utils';
import { useCallback } from 'react';
import { PHOTO_TYPE } from '@/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotosMutation } from '@/store/graphql';
import { useHandleUpdateArticles } from '@/app/(home)/AppList/Editor/hooks';
import '@kunlunxu/brick/es/markdown/style';

// 渲染 md 插件 markdown-to-jsx 配置
const MD_TO_JSX_OPTIONS = {
  overrides: {
    img: ({ alt, src }) => {
      const handledSrc = /^https?:/.test(src) ? src : getOssUrl(src);

      return (
        <img
          alt={alt}
          src={handledSrc}
        />
      );
    },
  },
};

const Editor = (props) => {
  const dispatch = useDispatch();
  const handleUpdateArticles = useHandleUpdateArticles();

  const [uploadPhotos] = useUploadPhotosMutation();

  // 读取文章详细内容
  const article = useSelector((state) => (
    state.editor?.articles?.[props.work.articleId]
  ));

  // 保存(ctr + s): 修改文章内容
  const handleSave = useCallback(async ({ value: content }) => {
    await handleUpdateArticles({
      body: { content },
      conds: { id: article.id  },
    });

    dispatch(actions.editor.setWorks([{
      change: false,
      articleId: article.id,
    }]));
  }, [dispatch, handleUpdateArticles, article.id]);

  // 内容改变
  const handleChange = useCallback(({ value: content }) => {
    const change = (article.content || '') !== content;

    if (props.work.change === change) {
      return false;
    }

    dispatch(actions.editor.setWorks([{
      change,
      articleId: article.id,
    }]));
  }, [article, dispatch, props.work.change]);

  // 插入图片
  const handleInsertImages = useCallback(async ({ files }) => {
    const { data } = await uploadPhotos({
      body: {
        files,
        payload: article.id,
        type: PHOTO_TYPE.ARTICLE.VALUE,
      },
    });

    return data.uploadPhotos.change.map((v) => v.name);
  }, [article.id, uploadPhotos]);

  return (
    <Markdown
      onSave={handleSave}
      value={article.content}
      onChange={handleChange}
      mdToJsxOptions={MD_TO_JSX_OPTIONS}
      onInsertImages={handleInsertImages}
    />
  );
};

export default Editor;
