import { makeAutoObservable } from "mobx";
import { Auth } from "../apis/agent";
const UserStore = makeAutoObservable({
  currentUser: "",
  loadingUser: "",
  updatingUser: "",
  updatingUserErrors: "",
  pullUser() {
    this.loadingUser = true;
    return Auth.current();
  },
  updateUser(newUser) {
    this.updatingUser = true;
    return Auth.save();
  },
  forgetUser() {
    this.currentUser = undefined;
  },
});
export default UserStore;
