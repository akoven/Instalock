const GET_PROFILE  = 'profile/GET_PROFILE';

export const getProfile = (user) => ({
    type: GET_PROFILE,
    payload: user
})

export const displayUserInfo = (userId) => async dispatch =>{
    const response = await fetch(`/api/profile/${userId}`);
    console.log('RESPONSE:', response)
    if(response.ok){
        const userProfile = await response.json();
        console.log('USER PROFILE:',userProfile)
        dispatch(getProfile(userProfile))
    }
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
