const GET_PROFILE  = 'profile/GET_PROFILE';
const DELETE_PROFILE = 'profile/DELETE_PROFILE';

export const getProfile = (user) => ({
    type: GET_PROFILE,
    payload: user
});

export const delProfile = (user) => ({
    type: DELETE_PROFILE,
    payload: user
})

export const displayUserInfo = (userId) => async dispatch =>{
    const response = await fetch(`/api/profile/${userId}`);
    // console.log('RESPONSE:', response)
    if(response.ok){
        const userProfile = await response.json();
        console.log('USER PROFILE:',userProfile)
        dispatch(getProfile(userProfile))
    }
}

export const deleteProfile = (userId) => async dispatch =>{
    const response = await fetch(`/api/profile/${userId}`, {
        method: 'DELETE'
    });
    dispatch(deleteProfile(userId))

}

const profileReducer = (state = {}, action) =>{
    let newState = {};
    switch(action.type){
        case GET_PROFILE:
            newState = action.payload;
            return newState;

        default:
            return state;
    }
}

export default profileReducer;
