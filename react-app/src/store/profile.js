const GET_PROFILE  = 'profile/GET_PROFILE';
const DELETE_PROFILE = 'profile/DELETE_PROFILE';
const EDIT_PROFILE = 'profile/EDIT_PROFILE';

export const getProfile = (user) => ({
    type: GET_PROFILE,
    payload: user
});

export const editProfile = (user) => ({
    type: EDIT_PROFILE,
    payload: user
});

export const delProfile = (user) => ({
    type: DELETE_PROFILE,
    payload: user
});

export const getProfileThunk = (userId) => async dispatch =>{
    const response = await fetch(`/api/profile/${userId}`);

    if(response.ok){
        const userProfile = await response.json();

        dispatch(getProfile(userProfile))
    }
}

export const deleteProfile = (userId) => async dispatch =>{
    const response = await fetch(`/api/profile/${userId}`, {
        method: 'DELETE'
    });
    dispatch(delProfile(userId))
    return response;
}

export const editProfileParams = (userProfile, userId) => async dispatch =>{
    const response = await fetch(`/api/profile/edit/${userId}`, {

        headers:{

            'Content-Type':'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(userProfile)
        // body: userProfileData
    });

    if(response.ok){
        const editedProfile = await response.json();
        dispatch(editProfile(editedProfile));
        return editedProfile;
    }
}

const profileReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_PROFILE:
            newState = action.payload;
            return newState;
        case DELETE_PROFILE:
            delete newState[action.payload.id]
        case EDIT_PROFILE:
            newState = action.payload;
            return newState;

        default:
            return state;
    }
}

export default profileReducer;
