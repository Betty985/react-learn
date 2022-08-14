import { makeAutoObservable, action } from "mobx";
import * as agent from "../apis/agent";
const LIMIT = 10;
const commentsStore = makeAutoObservable({
  isCreatingComment: false,
  isLoadingComments: false,
  commentErrors: undefined,
  articleSlug: undefined,
  comments: [],
  setArticleSlug(articleSlug) {
    if (this.articleSlug !== articleSlug) {
      this.comments = [];
      this.articleSlug = articleSlug;
    }
  },
  loadComments() {
    this.isLoadingComments = true;
    this.commentErrors = undefined;
    return agent.Comments.forArticle(this.articleSlug)
      .then(
        action(({ comments }) => {
          this.comments = comments;
        })
      )
      .catch(
        action((err) => {
          this.commentErrors = err?.response?.body?.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.isLoadingComments = false;
        })
      );
  },
  createComment(comment) {
    this.isCreatingComment = true;
    return agent.Comments.create(this.articleSlug, comment)
      .then(() => this.loadComments())
      .finally(
        action(() => {
          this.isCreatingComment = false;
        })
      );
  },
  deleteComment(id) {
    const idx = this.comments.findIndex((c) => c.id === id);
    if (idx > -1) this.comments.splice(idx, 1);
    return agent.Comments.delete(this.articleSlug, id).catch(
      action((err) => {
        this.loadComments();
        throw err;
      })
    );
  },
});
export default commentsStore;
