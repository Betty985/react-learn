import { useEffect, useState } from "react";
import useStores from './useStores'
import { parse as qsParse } from "query-string";
import { useLocation, useParams } from "react-router-dom";
import { Caller } from '../typings'
function useArticles(caller: Caller) {
    const { articlesStore, } = useStores()
    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)
    // tab和tag的状态
    const [state, setState] = useState({})
    const location = useLocation()
    const params = useParams()
    function getTab(): string {
        if (caller === Caller.PROFILE) {
            if (/\/favorites/.test(location.pathname)) return "favorites";
            return "all";
        }
        if (caller === Caller.HOME) {
            return qsParse(location.search).tab as string || "all";
        }
    }
    useEffect(() => {
        articlesStore.setPredicate(getPredicate())
        articlesStore.loadArticles().then(() => {
            setArticles(articlesStore.articles)
            setLoading(articlesStore.isLoading)
        })
    }, [])
    useEffect(() => {
        if (JSON.stringify(state) != JSON.stringify(getPredicate())) {
            setState(getPredicate())
            setLoading(true)
            articlesStore.setPredicate(getPredicate())
            articlesStore.loadArticles().then(() => {
                setArticles(articlesStore.articles)
                setLoading(articlesStore.isLoading)
            })
        }
    })

    const getPredicate = () => {
        const tab = getTab()
        if (caller === Caller.HOME) {
            switch (tab) {
                case "feed":
                    return { myFeed: true };
                case "tag":
                    return {
                        tag: qsParse(location.search).tag
                    };
                default:
                    return {};
            }
        }
        if (caller === Caller.PROFILE) {
            switch (tab) {
                case "favorites":
                    return { favoritedBy: params.username };
                default:
                    return { author: params.username };
            }
        }

    }
    return { articles, isLoading }
}
export default useArticles