import useStores from "../../hooks/useStores";
import React, { FC } from "react";
import { Link } from "react-router-dom";
const classes = "btn btn-sm action-btn";
const followingClasses = classes + " btn-secondary";
const unfollowingClasses = classes + "  btn-outline-secondary";
const ProfilePage: FC = () => {
    const { profileStore, userStore } = useStores()
    const { profile, following, username, unfollow, follow } = profileStore;
    const { currentUser } = userStore;
    const isUser = currentUser && profile.username === currentUser.username;
    const btnClasses = following ? followingClasses : unfollowingClasses
    const handleClick = e => {
        e.preventDefault();
        if (following) {
            unfollow(username);
        } else {
            follow(username);
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
                                    <i className="ion-gear-a" /> 编辑主页设置
                                </Link>
                            ) : (<button className={btnClasses} onClick={handleClick}>
                                <i className="ion-plus-round" />
                                &nbsp;
                                {following ? "取关" : "关注"} {username}
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage