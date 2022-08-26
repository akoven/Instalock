import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProfileThunk } from '../../store/profile';
import FollowersDisplayModal from '../ProfileModals/FollowersModal';
import FollowingDisplayModal from '../ProfileModals/FollowingModal';
import { addFollowThunk, getFollowData } from '../../store/follows';
import { removeFollowThunk } from '../../store/follows';

const ProfilePage = () => {

    const userSession = useSelector(state => state.session.user)
    const userProfile = useSelector(state => state.profile);
    const followers = useSelector(state => state.follows.followers)
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    const [ isFollowing, setIsFollowing ] = useState(false)

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
        <h2>{userProfile?.profile?.username}</h2>
            <img src={userProfile?.profile?.profile_image_url} alt='image-here'/>
            <p>Followers: {userProfile?.follower_count}</p>
            <p>Following: {userProfile?.following_count}</p>
            <p>{userProfile?.profile?.website}</p>
            <p>{userProfile?.profile?.bio}</p>
            <button onClick={() => history.push(`/profile/edit/${userSession.id}`)}>Edit my profile</button>

       </>
    )
}

export default ProfilePage;
