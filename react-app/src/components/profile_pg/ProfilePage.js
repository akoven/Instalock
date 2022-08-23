import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import {displayUserInfo} from '../../store/profile';

const ProfilePage = () => {

    const userSession = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    // const {userId} = useParams();
    const userProfile = useSelector(state => state.profile);

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

        dispatch(displayUserInfo(userSession.id))

    }, [dispatch, userSession])


    return(
       <>
        <h3>{userProfile.profile.username}</h3>
        <p>Followers: {userProfile.follower_count}</p>
        <p>Following: {userProfile.following_count}</p>
        {/* <p>{userProfile.profile.bio}</p> */}
       </>

    )
}

export default ProfilePage;
