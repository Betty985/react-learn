import { action, makeAutoObservable } from "mobx";
import { auth } from "../apis/agent";
const UserStore = makeAutoObservable({
  currentUser: "",
  loadingUser: false,
  updatingUser: "",
  updatingUserErrors: "",
  pullUser() {
    this.loadingUser = true;
    return auth
      .current()
      .then(action(({ user }) => { 
        console.log(user)
        this.currentUser = user; }))
      .finally(action(() => { this.loadingUser = false; }))
  },
  updateUser(newUser) {
    this.updatingUser = true;
    return auth
      .save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  },
  forgetUser() {
    this.currentUser = undefined;
  },
});
export default UserStore;
