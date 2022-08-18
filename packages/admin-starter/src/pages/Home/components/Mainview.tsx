import ArticleList from "@/components/ArticleList";
import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { YourFeedTab, GlobalFeedTab, TagFilterTab } from './FeedTab'
import { parse as qsParse } from "query-string";
import useStores from "@/hooks/useStores";
interface A{
    location:any;
    router:any;
}
const MainView: FC<A> = observer((props) => {
    const { articlesStore, commonStore, userStore } = useStores()
    const {location,router}=props
    const { currentUser } = userStore;
    const {
        articles,
        isLoading,
        page,
        totalPagesCount
    } = articlesStore;

    const getTab = () => {
        return qsParse(props.location.search).tab || "all";
    }
    const getPredicate = (props) => {
        switch (getTab()) {
            case "feed":
                return { myFeed: true };
            case "tag":
                return { tag: qsParse(props.location.search).tag };
            default:
                return {};
        }
    }
    const handleTabChange = tab => {
        if (location.query.tab === tab) return;
        router.push({ ...location, query: { tab } });
    };

    const handleSetPage = page => {
        articlesStore.setPage(page);
        articlesStore.loadArticles();
    };
    useEffect(() => {
        articlesStore.setPredicate(getPredicate(props));
        articlesStore.loadArticles()
    },[props])
    return (
        <div className="col-md-9">
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <YourFeedTab currentUser={currentUser}  />

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
// @withRouter
export default MainView