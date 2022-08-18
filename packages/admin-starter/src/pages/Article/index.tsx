import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import {marked} from 'marked'
import RedError from "../../components/RedError";
import ArticleMeta from "./components/ArticleMeta";
import CommentContainer from "./components/Comment";
import useStores from "../../hooks/useStores";
interface A {
    match: any
}
const Article: FC<A> = (props) => {
    const { articlesStore, commentStore, userStore } = useStores()
    const navigate = useNavigate()
    const handleDeleteArticle = slug => {
        articlesStore.deleteArticle(slug).then(() => navigate('/'))
    }
    const handleDeleteComment = id => {
        commentStore.deleteComment(id)
    }
    // 初次挂载
    useEffect(() => {
        const slug = props.match.params.id
        articlesStore.loadArticle(slug, { acceptCached: true })
        commentStore.setArticleSlug(slug)
        commentStore.loadComments()
    }, [])
    const slug = props.match.params.id
    const { currentUser } = userStore
    const { comments, commentErrors } = commentStore
    const article = articlesStore.getArticle(slug)
    const canModify = currentUser?.username === article.author.name
    const markup = { __html: marked.parse(article.body, { sanitize: true }) }
    if (!article) return <RedError message="无法加载文章" />;
    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>
                    <ArticleMeta
                        article={article}
                        canModify={canModify}
                        onDelete={handleDeleteArticle} />
                </div>
            </div>
            <div className="container page">
                <div className="row article-content">
                    <div dangerouslySetInnerHTML={markup} />
                    <ul className="tag-list">
                        {article.tagList.map(tag => {
                            return (
                                <li className="tag-default tag-pill tag-outline" key={tag}>
                                    {tag}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="article-actions" />
            <hr />
            <div className="row">
                <CommentContainer
                    comments={comments}
                    errors={commentErrors}
                    slug={slug}
                    currentUser={currentUser}
                    onDelete={handleDeleteComment}
                />
            </div>
        </div>
    )
}
observer(Article)
export default Article