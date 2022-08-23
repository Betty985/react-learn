import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {marked} from 'marked'
import RedError from "../../components/RedError";
import ArticleMeta from "./components/ArticleMeta";
import CommentContainer from "./components/Comment";
import useStores from "../../hooks/useStores";
const Article: FC = () => {
    const { articlesStore, commentsStore, userStore } = useStores()
    const params=useParams()
    const navigate = useNavigate()
    const handleDeleteArticle = slug => {
        articlesStore.deleteArticle(slug).then(() => navigate('/',{replace:true}))
    }
    const handleDeleteComment = id => {
        commentsStore.deleteComment(id)
    }
    // 初次挂载
    useEffect(() => {
        const slug = params.id
        articlesStore.loadArticle(slug, { acceptCached: true })
        commentsStore.setArticleSlug(slug)
        commentsStore.loadComments()
    }, [])
    const slug = params.id
    const { currentUser } = userStore
    const { comments, commentErrors } = commentsStore
    const article = articlesStore.getArticle(slug)
    const canModify = currentUser?.username === article.author.username
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

export default Article