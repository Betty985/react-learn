import ArticleList from "@/components/ArticleList";
import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { YourFeedTab, GlobalFeedTab, TagFilterTab } from './FeedTab'
import { parse as qsParse } from "query-string";
import useStores from "@/hooks/useStores";
import { useLocation } from "react-router-dom";

const MainView: FC = observer(() => {
    const { articlesStore, userStore } = useStores()
    const location = useLocation()
    const { currentUser } = userStore;
    const {
        articles,
        isLoading,
        page,
        totalPagesCount
    } = articlesStore;

    const getTab = () => {
        return qsParse(location.search).tab || "all";
    }
    const getPredicate = () => {
        switch (getTab()) {
            case "feed":
                return { myFeed: true };
            case "tag":
                return { tag: qsParse(location.search).tag };
            default:
                return {};
        }
    }
    const handleSetPage = page => {
        articlesStore.setPage(page);
        articlesStore.loadArticles();
    };
    useEffect(() => {
        articlesStore.setPredicate(getPredicate());
        articlesStore.loadArticles()
    })
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