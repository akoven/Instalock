import React, {useEffect, useState} from 'react';
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
    // const userPosts = useSelector(state => state.posts)
    const userProfile = useSelector(state => state.profile);
    const followers = useSelector(state => state.follows.followers)
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const [ isFollowing, setIsFollowing ] = useState(false)

    const postImages = userProfile.posts;
    const postImgArr = Object.values(postImages||{});
    // useEffect(() =>{
    //     if(userSession){
    //         (async () =>{
    //             const response = await fetch(`/api/profile/${userId}`)
    //             const profile_data = await response.json();
    //             setUserProfile(profile_data)
    //         })();
    //     }
    // }, [userId])

    useEffect(() =>{
        dispatch(getFollowData(userId))
        dispatch(getProfileThunk(userId))
        // console.log('user posts: ',userProfile.posts)
        // console.log('user post images: ',userProfile.posts[0].image_url)
    }, [dispatch])



    const unfollow = async () => {
        let followId = null;

        Object.entries(followers).forEach(follower => {
            if (follower[1].id === userSession.id) {
                console.log("inside the if")
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

    return(
       <>
        {userSession.id == userId ? '' : <div>{followers && Object.values(followers).filter(follow => follow.id === userSession.id).length > 0 ? <button onClick={unfollow}>Unfollow</button> : <button onClick={follow}>Follow</button> }</div>}
        <FollowersDisplayModal />
        <FollowingDisplayModal />
        <img className='profile-img' src='https://www.slashfilm.com/img/gallery/14-shows-like-rick-morty-that-are-worth-your-time/intro-1628182486.webp' alt='image-here'/>
        <p className='profile-username'>{userProfile?.profile?.username} <span><button  className='edit-profile-button' onClick={() => history.push(`/profile/edit/${userSession.id}`)}>Edit profile</button></span></p>
            {/* <p className='followers'>Followers: {userProfile?.follower_count}</p>
            <p className='following'>Following: {userProfile?.following_count}</p> */}
            <p className='website-url'>{userProfile?.profile?.website}</p>
            <p className='biography'>{userProfile?.profile?.bio}</p>
            {postImages.map(image =><div><img className='postImgs' src={image.image_url} /></div>)}
       </>
    )
}

export default ProfilePage;
