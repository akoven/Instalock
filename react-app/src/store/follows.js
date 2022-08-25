const ADD_FOLLOW = 'follows/add_follow'
const GET_FOLLOW_CONNECTIONS = 'follows/get_follow_connections'
const REMOVE_FOLLOW = 'follows/remove_follow'

const addFollow = (follow) => {

}

const getFollowConnections = (followData) => {
    return {
        type: GET_FOLLOW_CONNECTIONS,
        followData
    }
}


export const getFollowData = (userId) => async dispatch => {
    const res = await fetch(`/api/followers/${userId}`)

    if (res.ok) {
        const followData = await res.json();
        dispatch(getFollowConnections(followData))
        return followData
    }
}


export default function reducer (state = {}, action) {
    let newState = {}
    switch (action.type) {
        case GET_FOLLOW_CONNECTIONS: {
            newState = action.followData
            return newState
        }
        default: {
            return state
        }
    }
}
