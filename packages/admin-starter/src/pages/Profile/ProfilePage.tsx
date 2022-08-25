import useStores from "../../hooks/useStores";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const classes = "btn btn-sm action-btn";
const followingClasses = classes + " btn-secondary";
const unfollowingClasses = classes + "  btn-outline-secondary";
const ProfilePage: FC = () => {
    const { profileStore, userStore } = useStores()
    const [profile, setProfile] = useState({
        username: undefined,
        following: undefined,
        unfollow: undefined,
        follow: undefined,
        image: undefined,
        bio: undefined
    });
    const [btnClasses,setBtn]=useState('')
    const { currentUser } = userStore;
    const params = useParams()
    useEffect(() => {
        profileStore.loadProfile(params.username).then(() => {
            setProfile(profileStore.profile)
            setBtn(profile.following?followingClasses:unfollowingClasses)
        }
        )
    }, [])
    const isUser = currentUser && profile?.username === currentUser.username;
    const handleClick = e => {
        e.preventDefault();
        if (profile.following) {
            profileStore.unfollow(params.username)
                .then(() => {
                    setProfile(profileStore.profile)
                    setBtn(unfollowingClasses)
                })
        } else {
            profileStore.follow(params.username)
                .then(() => {
                    setProfile(profileStore.profile)
                    setBtn(followingClasses)
                })
        }
    };

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={profile.image} className="user-img" alt="" />
                            <h4>{profile.username}</h4>
                            <p>{profile.bio}</p>

                            {isUser ? (
                                <Link
                                    to="/settings"
                                    className="btn btn-sm btn-outline-secondary action-btn"
                                >
                                    <i className="ion-gear-a" /> Edit Profile Settings
                                </Link>
                            ) : (<button className={btnClasses} onClick={handleClick}>
                                <i className="ion-plus-round" />
                                &nbsp;
                                {profile.following ? "Unfollow" : "Follow"} {params.username}
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage