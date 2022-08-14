import { action, makeAutoObservable } from "mobx";
import ArticlesStore from "./articlesStore";
import { profile } from "../apis/agent";
const profileStore = makeAutoObservable({
  profile: undefined,
  isLoadingProfile: false,
  ArticlesStore,
  loadProfile(username) {
    this.isLoadingProfile = true;
    profile
      .get(username)
      .then(
        action((props) => {
          const { profile } = props;
          this.profile = profile;
        })
      )
      .finally(
        action(() => {
          this.isLoadingProfile = false;
        })
      );
  },
  follow() {
    if (!this.profile?.following) {
      this.profile.following = true;
      profile.follow(this.profile.username).catch(
        action(() => {
          this.profile.following = false;
        })
      );
    }
  },
  unfollow() {
    if (this.profile?.following) {
      this.profile.following = false;
      profile.unfollow(this.profile.username).catch(
        action(() => {
          this.profile.following = true;
        })
      );
    }
  },
});

export default profileStore;
