import useStores from "./useStores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FOLLOW_BTN, UNFOLLOW_BTN } from '../constant'
function useProfile() {
    const { profileStore, userStore } = useStores()
    const { currentUser } = userStore;
    const params = useParams()
    const [btnClasses, setBtn] = useState('')
    const [profile, setProfile] = useState(profileStore.profile);
    const [isAuthor, setIsAuthor] = useState(profile?.username === currentUser.username)
    // const isUser = currentUser && ;
    const handleClick = e => {
        e.preventDefault();
        if (profile.following) {
            profileStore.unfollow(params.username)
                .then(() => {
                    setBtn(UNFOLLOW_BTN)
                })
        } else {
            profileStore.follow(params.username)
                .then(() => {
                    setBtn(FOLLOW_BTN)
                })
        }
    };
    useEffect(() => {
        profileStore.loadProfile(params.username).then(() => {
            setProfile(profileStore.profile)
            setIsAuthor(profile?.username === currentUser.username)
        }
        )
    }, [])
    useEffect(() => {
        if (profile.username !== params.name) {
            console.log(profile.name,params.username)
            profileStore.loadProfile(params.username).then(() => {
                setProfile(profileStore.profile)
                setIsAuthor(profile?.username === currentUser.username)
            })
        }
    },[])
    return { profile, isAuthor, btnClasses, params, handleClick }
}
export default useProfile