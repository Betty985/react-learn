import useStores from "./useStores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function useProfile() {
    const { profileStore } = useStores()
    const [profile, setProfile] = useState({
        username: undefined,
        following: undefined,
        unfollow: undefined,
        follow: undefined,
        image: undefined,
        bio: undefined
    });
    const params = useParams()
    useEffect(() => {
        profileStore.loadProfile(params.username).then(() => {
            setProfile(profileStore.profile)
        }
        )
    }, [])
    return { profile }
}
export default useProfile