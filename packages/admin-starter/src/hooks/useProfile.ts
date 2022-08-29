import useStores from "./useStores";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FOLLOW_BTN, UNFOLLOW_BTN, INIT_BTN } from "../constant";
function useProfile() {
  const { profileStore, userStore } = useStores();
  const { currentUser } = userStore;
  const params = useParams();
  const [btnClasses, setBtn] = useState(INIT_BTN);
  const [profile, setProfile] = useState(profileStore.profile);
  const [isAuthor, setIsAuthor] = useState(()=>profile?.username === currentUser.username);
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  // const isUser = currentUser && ;
  const handleClick = (e) => {
    e.preventDefault();
    if (profile.following) {
      profileStore.unfollow(params.username).then(() => {
        setBtn(UNFOLLOW_BTN);
      });
    } else {
      profileStore.follow(params.username).then(() => {
        setBtn(FOLLOW_BTN);
      });
    }
  };
  useEffect(() => {
    profileStore.loadProfile(params.username).then(()=>{
        setProfile(profileStore.profile);
    });
  },[]);
  useLayoutEffect(()=>{
    if (currentUser) {
        setIsAuthor(profile?.username === currentUser.username);
      } else {
        setIsAuthor(false);
      }
  })
  useEffect(() => {
    setLoadingProfile(profileStore.isLoadingProfile);
  });
  return {
    isLoadingProfile,
    profile,
    isAuthor,
    btnClasses,
    params,
    handleClick,
  };
}
export default useProfile;
