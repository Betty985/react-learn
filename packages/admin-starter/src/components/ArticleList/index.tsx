import ArticlePreview from "../ArticlePreview";
import ListPagination from "../ListPagination";
import LoadingSpinner from "../LoadingSpinner";
import React, { FC } from "react";
interface A {
  articles: Array<any>;
  loading: any;
  totalPagesCount: any;
  currentPage: any;
  onSetPage: any;
}
const ArticleList: FC<A> = (props) => {
  const { loading, articles, totalPagesCount, currentPage, onSetPage } = props;
  if (loading && articles?.length === 0) {
    return <LoadingSpinner />;
  }

  if (articles?.length === 0) {
    return <div className="article-preview">还没有文章~</div>;
  }

  return (
    <div>
      {articles?.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      <ListPagination
        onSetPage={onSetPage}
        totalPagesCount={totalPagesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticleList;
