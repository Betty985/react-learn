import { action, makeAutoObservable, observable } from "mobx";
import * as agent from "../apis/agent";
const LIMIT = 10;
const articlesStore = makeAutoObservable({
  isLoading: false,
  page: 0,
  totalPagesCount: 0,
  articlesRegistry: observable.map(),
  predicate: {},
  get articles() {
    return Array.from(this.articlesRegistry.values());
  },
  clear() {
    this.articles = [];
    this.articlesRegistry.clear();
    this.page = 0;
  },

  getArticle(slug) {
    return this.articlesRegistry.get(slug);
  },

  setPage(page) {
    this.page = page;
  },
  setPredicate(predicate) {
    if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
    this.clear();
    this.predicate = predicate;
  },

  updatePredicate(predicate) {
    const newPredicate = Object.assign({}, this.predicate, predicate);
    if (JSON.stringify(newPredicate) === JSON.stringify(this.predicate)) return;
    this.clear();
    this.predicate = newPredicate;
  },
  $req() {
    if (this.predicate.myFeed) return agent.articles.feed(this.page, LIMIT);
    if (this.predicate.favoritedBy)
      return agent.articles.favoritedBy(
        this.predicate.favoritedBy,
        this.page,
        LIMIT
      );
    if (this.predicate.tag)
      return agent.articles.byTag(this.predicate.tag, this.page, LIMIT);
    if (this.predicate.author)
      return agent.articles.byAuthor(this.predicate.author, this.page, LIMIT);
    return agent.articles.all(this.page, LIMIT);
  },
  loadArticles() {
    this.isLoading = true;
    return this.$req()
      .then(
        action(({ articles, articlesCount } ) => {
          this.articlesRegistry.clear();
          articles?.forEach((article) =>
            this.articlesRegistry.set(article.slug, article)
          );
          this.totalPagesCount = Math.ceil(articlesCount / LIMIT);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  },

  loadArticle(slug, { acceptCached = false } = {}) {
    if (acceptCached) {
      const article = this.getArticle(slug);
      if (article) return Promise.resolve(article);
    }
    this.isLoading = true;
    return agent.articles
      .get(slug)
      .then(
        action(({ article }) => {
          this.articlesRegistry.set(article.slug, article);
          return article;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  },

  makeFavorite(slug) {
    const article = this.articles.find((a) => a.slug === slug);
    if (article && !article.favorited) {
      article.favorited = true;
      article.favoritesCount++;
      return agent.articles.favorite(slug).catch(
        action((err) => {
          article.favorited = false;
          article.favoritesCount--;
          throw err;
        })
      );
    }
    return Promise.resolve();
  },

  unmakeFavorite(slug) {
    const article = this.articles.find((a) => a.slug === slug);
    if (article && article.favorited) {
      article.favorited = false;
      article.favoritesCount--;
      return agent.articles.unfavorite(slug).catch(
        action((err) => {
          article.favorited = true;
          article.favoritesCount++;
          throw err;
        })
      );
    }
    return Promise.resolve();
  },

  createArticle(article) {
    agent.articles.create(article).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article);
      return article;
    });
  },

  updateArticle(article) {
    agent.articles.update(article).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article);
      return article;
    });
  },

  deleteArticle(slug) {
    const idx = this.articles.findIndex((c) => c.slug === slug);
    if (idx > -1) this.articles.splice(idx, 1);
    this.articlesRegistry.delete(slug);
    return agent.articles.del(slug).catch(
      action((err) => {
        this.loadArticles();
        throw err;
      })
    );
  },
});
export default articlesStore;
