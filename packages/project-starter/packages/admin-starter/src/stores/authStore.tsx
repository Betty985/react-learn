import { action, makeAutoObservable } from "mobx";
import { hashHistory } from "react-router";
import * as agent from "../apis/agent";
import userStore from "./userStore";
const updateToken = (token) => {
  window.localStorage.setItem("jwt", token);
  agent.setToken(token);
};
const authStore = makeAutoObservable({
  inProgress: false,
  errors: undefined,
  values: {
    username: "",
    email: "",
    password: "",
  },
  setUsername(username) {
    this.values.username = username;
  },
  setEmail(email) {
    this.values.email = email;
  },
  setPassword(password) {
    this.values.password = password;
  },
  reset() {
    this.values.username = "";
    this.values.email = "";
    this.values.password = "";
  },
  login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ user }) => updateToken(user.token))
      .then(() => userStore.pullUser())
      .then(() => {
        hashHistory.replace("/");
      })
      .catch(
        action((err) => {
          this.errors = err?.response?.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  },
  register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(
      this.values.username,
      this.values.email,
      this.values.password
    )
      .then(({ user }) => updateToken(user.token))
      .then(() => userStore.pullUser())
      .then(() => hashHistory.replace("/"))
      .catch(
        action((err) => {
          this.errors = err?.response?.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  },
  logout() {
    updateToken(null);
    userStore.forgetUser();
    hashHistory.replace("/");
  },
});
export default authStore;
