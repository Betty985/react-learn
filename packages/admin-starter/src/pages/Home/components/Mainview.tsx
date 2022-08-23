import ArticleList from "../../../components/ArticleList";
import React, { FC, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { YourFeedTab, GlobalFeedTab, TagFilterTab } from './FeedTab'
import { parse as qsParse } from "query-string";
import useStores from "../../../hooks/useStores";
import { useLocation } from "react-router-dom";

const MainView: FC = observer(() => {
    const { articlesStore, userStore } = useStores()
    const location = useLocation()
    const tabRef = useRef("all")
    const tagRef = useRef(qsParse(location.search).tag)
    const { currentUser } = userStore;
    const {
        articles,
        isLoading,
        page,
        totalPagesCount
    } = articlesStore;

    const getPredicate = () => {
        tabRef.current = qsParse(location.search).tab as string || "all";
        switch (tabRef.current) {
            case "feed":
                return { myFeed: true };
            case "tag":
                {
                    tagRef.current = qsParse(location.search).tag
                    return {
                        tag: tagRef.current
                    }
                };
            default:
                return {};
        }
    }
    const handleSetPage = page => {
        articlesStore.setPage(page);
        articlesStore.loadArticles();
    };
    useEffect(() => {
        console.log(1, getPredicate())
        articlesStore.setPredicate(getPredicate())
        articlesStore.loadArticles()
    }, [tagRef.current])
    useEffect(() => {
       console.log(getPredicate(),tagRef.current) 
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