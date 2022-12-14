import React, {useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProfileThunk } from '../../store/profile';
import FollowersDisplayModal from '../ProfileModals/FollowersModal';
import FollowingDisplayModal from '../ProfileModals/FollowingModal';
import './profilePage.css';
import { addFollowThunk, getFollowData } from '../../store/follows';
import { removeFollowThunk } from '../../store/follows';

const ProfilePage = () => {

    const userSession = useSelector(state => state.session.user)
    const userProfile = useSelector(state => state.profile);
    const followers = useSelector(state => state.follows.followers)
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const postImages = userProfile.posts;
    const postImgArr = Object.values(postImages||{});


    useEffect(() =>{
        dispatch(getFollowData(userId))
        dispatch(getProfileThunk(userId))
    }, [dispatch])



    const unfollow = async () => {
        let followId = null;

        Object.entries(followers).forEach(follower => {
            if (follower[1].id === userSession.id) {
                followId = Number(follower[0])
            }
        })

        const success = await dispatch(removeFollowThunk(followId))

        if (success) {
            dispatch(getProfileThunk(userId))
            dispatch(getFollowData(userId))
        }
    }

    const follow = async () => {
        const payload = {
            user_id: userSession.id,
            follower_id: userProfile.profile.id
        }

        const success = await dispatch(addFollowThunk(payload))

        if (success) {
            dispatch(getProfileThunk(userId))
            dispatch(getFollowData(userId))
        }
    }
    const profilePostClick = (id) => {
        history.push(`/posts/${id}`)
    }

    return(

        <div className="profile-main-container">
            <div className="profile-top-section">
                <div className="profile-page-user-image">
                    {userProfile?.profile?.profile_image_url ? (
                        <img className='pp-user-image' src={userProfile?.profile?.profile_image_url} alt="" />
                    ) : (
                        <img className='pp-user-image' src="https://i.imgur.com/f906ONQ.jpg" alt="Profile"/>
                    )
                    }
                </div>
                <div className="profile-page-user-info">

                    <div className='pp-user-follow'>
                        <div className="pp-username">{userProfile?.profile?.username}</div>
                        {userSession.id == userId ? '' : <div>{followers && Object.values(followers).filter(follow => follow.id === userSession.id).length > 0 ? <button className="unfollow-button" onClick={unfollow}>Unfollow</button> : <button className='follow-button' onClick={follow}>Follow</button> }</div>}
                    </div>
                    {/* <p className='profile-username'>{userProfile?.profile?.username} <span><button  className='edit-profile-button' onClick={() => history.push(`/profile/edit/${userSession.id}`)}>Edit profile</button></span></p> */}

                    <div className="pp-num-posts-and-followings">
                        <div className="pp-num-posts">{userProfile?.posts?.length} <span className='user-info-text'>posts</span></div>
                        <div className="followers-div">
                            <div className='followers'>
                                {userProfile.follower_count}
                            </div>
                            <div className='user-info-text'>
                                <FollowersDisplayModal />
                            </div>
                        </div>
                        <div className="followers-div">
                            <div className='followers'>
                                {userProfile.following_count}
                            </div>
                            <div className='user-info-text'>
                                <FollowingDisplayModal />
                            </div>
                        </div>
                    </div>
                    <div className="pp-user-bio">{userProfile?.profile?.bio}</div>

                </div>
            </div>
            <p className='pp-post-display-header'>POSTS</p>
            <div className="pp-user-post-display">
                {postImages?.map(image => <div onClick={() => profilePostClick(image.id)} className='pp-user-post'>
                    <img className='pp-user-post-image' src={image.image_url} alt=""/>
                    </div>)}
            </div>
        </div>
    )
}
// {userSession.id == userId ? '' : <div>{followers && Object.values(followers).filter(follow => follow.id === userSession.id).length > 0 ? <button onClick={unfollow}>Unfollow</button> : <button onClick={follow}>Follow</button> }</div>}
// <FollowersDisplayModal />
// <FollowingDisplayModal />
// <img className='profile-img' src='https://www.slashfilm.com/img/gallery/14-shows-like-rick-morty-that-are-worth-your-time/intro-1628182486.webp' alt='profile-pic'/>
// <p className='profile-username'>{userProfile?.profile?.username} <span><button  className='edit-profile-button' onClick={() => history.push(`/profile/edit/${userSession.id}`)}>Edit profile</button></span></p>
//     {/* <p className='followers'>Followers: {userProfile?.follower_count}</p>
//     <p className='following'>Following: {userProfile?.following_count}</p> */}
//     <p className='website-url'>{userProfile?.profile?.website}</p>
//     <p className='biography'>{userProfile?.profile?.bio}</p>
//     {postImages.map(image =><div><img className='postImgs' src={image.image_url} /></div>)}

export default ProfilePage;
