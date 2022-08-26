import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProfileThunk } from '../../store/profile';
import FollowersDisplayModal from '../ProfileModals/FollowersModal';
import FollowingDisplayModal from '../ProfileModals/FollowingModal';
import { getFollowData } from '../../store/follows';
import './profilePage.css';

const ProfilePage = () => {

    const userSession = useSelector(state => state.session.user)
    // const userPosts = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const userProfile = useSelector(state => state.profile);

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



    return(
       <>
       <div className='followers-following'>
            <FollowingDisplayModal />
            <FollowersDisplayModal />
       </div>

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
