import { useEffect, useState } from "react";
import useStores from "./useStores";
import { useParams } from "react-router-dom";
import useCurrentUser from "./useCurrentUser";
function useArticle() {
  const { articlesStore, commentsStore } = useStores();
  const { currentUser } = useCurrentUser();
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [article, setArticle] = useState(()=>({
    author: {
      bio: null,
      following: false,
      image: "",
      username: "",
    },
    body: undefined,
    tagList: [],
    title: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    updatedAt: "",
  }));
  //   todo:类型
  const [canModify, setModify] = useState(false);
  const [slug, setSlug] = useState(params.id);
  useEffect(() => {
    setSlug(params.id);
    commentsStore.setArticleSlug(slug);
    articlesStore.loadArticles(slug, { acceptCached: true }).then(() => {
      setArticle(articlesStore.getArticle(slug));
      if (currentUser) {
        setModify(currentUser.username === article.author.username);
      }
    });
    commentsStore.loadComments().then(() => {
      setComments(commentsStore.comments);
      setLoading(false);
    });
  }, [params]);

  return { canModify, article, slug, comments, isLoading };
}
export default useArticle;
