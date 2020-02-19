import React from 'react';

import { Editor } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

// 初始默认 options
const OPTIONS = {
  language: 'markdown',
  theme: 'one-dark-pro',
  fontFamily: 'monospace, \'Droid Sans Mono\', \'Droid Sans Fallback\'',
};

const useStateHook = props => {
  const dispatch = useDispatch();

  // 读取文章详细内容
  const article = useSelector(state => {
    const articles = _.get(state, 'editor.articles');
    return articles.find(v => v.id === props.work.article);
  });

  // 保存: ctr + s
  const onSave = async ({ value: content }) => {
    dispatch({
      id: article.id,
      body: { content },
      type: 'editor/updateArticle',
    });
  };

  // // 上传图片
  // const uploadPhone = async ({ file }) => {
  //   if (/^image\/.*/ig.test(file.type)) {
  //     const data = await uploadPhotos({
  //       files: [file],
  //       payload: article.id,
  //       spin: SPIN_CODE.APP_EDITOR,
  //       type: PHOTO_TYPE.ARTICLE.VALUE,
  //     });
  //     return _.get(data, '[0].url', '');
  //   }
  //   return null;
  // };

  return { article, onSave };
};

export default props => {
  const state = useStateHook(props);

  return (
    <Editor
      options={OPTIONS}
      onSave={state.onSave}
      onPaste={state.onPaste}
      value={state.article.content}
    />
  );
};
