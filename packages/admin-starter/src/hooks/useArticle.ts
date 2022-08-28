import { useEffect, useState } from "react";
import useStores from "./useStores";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "./useCurrentUser";
import DOMPurify from "dompurify";
import { marked } from "marked";
function useArticle() {
  const { articlesStore, commentsStore } = useStores();
  const { currentUser } = useCurrentUser();
  const params = useParams();

  const [article, setArticle] = useState({
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
  });
  const [markup, setMarkup] = useState({ __html: "" });
  //   todo:类型
  const [canModify, setModify] = useState(false);
  const [slug, setSlug] = useState(params.id);
  useEffect(() => {
    setSlug(params.id);
    commentsStore.setArticleSlug(slug);
    articlesStore.loadArticles(slug, { acceptCached: true }).then(() => {
      setArticle(articlesStore.getArticle(slug));
      const clean = DOMPurify.sanitize(article.body);
      setMarkup({ __html: marked.parse(clean) });
      if (currentUser) {
        setModify(currentUser.username === article.author.username);
      }
    });
  }, []);
  const navigate = useNavigate();
  const handleDeleteArticle = (slug) => {
    articlesStore
      .deleteArticle(slug)
      .then(() => navigate("/", { replace: true }));
  };

  return {
    markup,
    canModify,
    article,
    slug,
    handleDeleteArticle,
  };
}
export default useArticle;
