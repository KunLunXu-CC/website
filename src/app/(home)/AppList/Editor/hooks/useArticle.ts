import { useMemo } from 'react';
import useResourceStore from '../hooks/useResourceStore';

interface IUseArticleArgs {
  articleId: string;
}

const useArticle = ({ articleId }: IUseArticleArgs) => {
  const { findArticle } = useResourceStore();

  const article = useMemo(() => findArticle(articleId)!, [findArticle, articleId]);

  return { article };
};

export default useArticle;
