import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {displayUserInfo} from '../../store/profile';

const ProfilePage = () => {

    const userSession = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
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
        <h3>{userProfile?.profile?.username}</h3>
            <img src={userProfile?.profile?.profile_image_url} alt='image-here'/>
            <p>Followers: {userProfile?.follower_count}</p>
            <p>Following: {userProfile?.following_count}</p>
            <p>{userProfile?.profile?.website}</p>
            <p>{userProfile?.profile?.bio}</p>
            <button onClick={() => history.push('/profile/edit')}>Edit my profile</button>

       </>
    )
}

export default ProfilePage;
