import { actions } from '@store';
import { useCallback } from 'react';
import { Markdown } from '@kunlunxu/brick';
import { PHOTO_TYPE } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotosMutation } from '@store/graphql';


export default (props) => {
  const [uploadPhotos] = useUploadPhotosMutation();
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector((state) => (
    state.editor?.articles?.[props.work.articleId]
  ));

  // 保存(ctr + s): 修改文章内容
  const handleSave = async ({ value: content }) => {
    dispatch({
      content,
      id: article.id,
      type: 'editor/updateArticleContent',
    });
  };

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

  // 内容改变
  const handleChange = useCallback(({ value: content }) => {
    const change = (article.content || '') !== content;

    if (props.work.change === change) {
      return false;
    }

    dispatch(actions.editor.setWorks([{
      change,
      articleId: props.work.articleId,
    }]));
  }, [article.content, dispatch, props.work]);

  return (
    <Markdown
      onSave={handleSave}
      value={article.content}
      onChange={handleChange}
      onInsertImages={handleInsertImages}
    />
  );
};
