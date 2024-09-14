import { useMemo } from 'react';
import useResourceStore from '../hooks/useResourceStore';

interface IUseArticleArgs {
  articleId: string;
}

const useArticle = ({ articleId }: IUseArticleArgs) => {
  const { findArticle, articles } = useResourceStore();

  const article = useMemo(() => {
    if (articles) {
      return findArticle(articleId);
    }

    return null;
  }, [findArticle, articleId, articles]);

  return { article };
};

export default useArticle;
