import { action, makeAutoObservable } from "mobx";
import articlesStore from "./articlesStore";
const EditorStore = makeAutoObservable({
  inProgress: false,
  errors: undefined,
  articleSlug: undefined,
  title: "",
  description: "",
  body: "",
  tagList: [],
  setArticleSlug(articleSlug) {
    if (this.articleSlug !== articleSlug) {
      this.comments = [];
      this.articleSlug = articleSlug;
    }
  },
  loadInitialData() {
    if (!this.articleSlug) return Promise.resolve();
    this.inProgress = true;
    return articlesStore
      .loadArticle(this.articleSlug, { acceptCached: true })
      .then(
        action((article) => {
          if (!article) throw new Error("Can't load original article");
          this.title = article.title;
          this.description = article.description;
          this.body = article.body;
          this.tagList = article.tagList;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  },
  reset() {
    this.title = "";
    this.description = "";
    this.body = "";
    this.tagList = [];
  },
  setTitle(title) {
    this.title = title;
  },
  setDescription(description) {
    this.description = description;
  },
  setBody(body) {
    this.body = body;
  },
  addTag(tag) {
    if (this.tagList.includes(tag)) return;
    this.tagList.push(tag);
  },
  removeTag(tag) {
    this.tagList = this.tagList.filter((t) => t !== tag);
  },
  ubmit() {
    this.inProgress = true;
    this.errors = undefined;
    const article = {
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList,
      slug: this.articleSlug,
    };
    this.articleSlug = this.articleSlug
      ? articlesStore.updateArticle(article)
      : articlesStore.createArticle(article);
    return this.articleSlug
      .catch(
        action((err) => {
          this.errors = err?.response?.body?.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  },
});
export default EditorStore;
