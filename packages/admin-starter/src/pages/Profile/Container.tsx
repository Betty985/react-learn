import ArticleList from "../../components/ArticleList";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import useStores from "../../hooks/useStores";
const Container: FC = () => {
  const { profileStore, articlesStore } = useStores();
  const { profile } = profileStore;
  const { articles, totalPagesCount, isLoading ,page} = articlesStore;
  const handleSetPage = (page) => {
    articlesStore.setPage(page);
    articlesStore.loadArticles();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              <li className="nav-item">
                <NavLink className="nav-link" to={`/@${profile.username}`}>
                  我的文章
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/@${profile.username}/favorites`}
                >
                  点赞的文章
                </NavLink>
              </li>
            </ul>
          </div>
          
          <ArticleList
            articles={articles}
            totalPagesCount={totalPagesCount}
            onSetPage={handleSetPage}
            loading={isLoading}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
