import request from "./request";
import authStore from "../stores/authStore";
const encode = encodeURIComponent;

const handleErrors = (err) => {
  if (err?.response.status === 401) {
    authStore.logout();
  }
  return err;
};
const responseBody = (res) => res.body;
const auth = {
  current: () => request.get("/user"),
  login: (email, password) =>
    request.post("/user/login", { user: { email, password } }),
  register: (username, email, password) =>
    request.post("/users", { user: { username, email, password } }),
  save: (user) => request.put("/user", { user }),
};
const tags = {
  getAll: () => request.get("/tags"),
};
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article) => Object.assign({}, article, { slug: undefined });

const articles = {
  all: (page, lim = 11) => request.get(`/articles?${limit(lim, page)}`),
  byAuthor: (author, page,lim=5) =>
    request.get(`/articles?author=${encode(author)}&${limit(lim, page)}`),
  byTag: (tag, page, lim = 10) =>
    request.get(`/articles?tag=${encode(tag)}&${limit(lim, page)}`),
  del: (slug) => request.del(`/articles/${slug}`),
  favorite: (slug) => request.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page,lim=5) =>
    request.get(`/articles?favorited=${encode(author)}&${limit(lim, page)}`),
  feed: (page,lim=10) => request.get(`/articles/feed?${limit(lim, page)}`),
  get: (slug) => request.get(`/articles/${slug}`),
  unfavorite: (slug) => request.del(`/articles/${slug}/favorite`),
  update: (article) =>
    request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article) => request.post("/articles", { article }),
};

const comments = {
  create: (slug, comment) =>
    request.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    request.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug) => request.get(`/articles/${slug}/comments`),
};

const profile = {
  follow: (username) => request.post(`/profiles/${username}/follow`),
  get: (username) => request.get(`/profiles/${username}`),
  unfollow: (username) => request.del(`/profiles/${username}/follow`),
};

export { auth, tags, articles, comments, profile };
