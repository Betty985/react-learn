import ArticleList from "../../../components/ArticleList";
import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { YourFeedTab, GlobalFeedTab, TagFilterTab } from './FeedTab'
import { parse as qsParse } from "query-string";
import useStores from "../../../hooks/useStores";
import { useLocation } from "react-router-dom";
import useArticles from "../../../hooks/useArticles";
import { Caller } from "../../../typings";
const MainView: FC = observer(() => {
    const { articlesStore, userStore } = useStores()
    const location = useLocation()
    const {articles,isLoading}=useArticles(Caller.HOME)
    const { currentUser } = userStore
    const {
        page,
        totalPagesCount
    } = articlesStore;
    const handleSetPage = page => {
        articlesStore.setPage(page);
        articlesStore.loadArticles();
    };
    return (
        <div className="col-md-9">
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <YourFeedTab currentUser={currentUser} />
                    <GlobalFeedTab />
                    <TagFilterTab tag={qsParse(location.search).tag} />
                </ul>
            </div>
            <ArticleList
                articles={articles}
                loading={isLoading}
                totalPagesCount={totalPagesCount}
                currentPage={page}
                onSetPage={handleSetPage}
            />
        </div>
    );
})
export default MainView