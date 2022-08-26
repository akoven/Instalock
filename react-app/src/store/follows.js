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

const removeFollow = (followId) => {
    return {
        type: REMOVE_FOLLOW,
        followId
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

export const removeFollowThunk = (followId) => async dispatch => {
    const res = await fetch(`/api/followers/${followId}`, { method: 'DELETE' })

    if (res.ok) {
        dispatch(removeFollow(followId))
        return true
    }
}


export default function reducer (state = {}, action) {
    switch (action.type) {
        case GET_FOLLOW_CONNECTIONS: {
            let newState = {}
            newState = action.followData
            return newState
        }
        case REMOVE_FOLLOW: {
            let newState = {...state}
            if (newState.followers[action.followId]) {
                delete newState.followers[action.followId]
            } else {
            // if (newState.following[action.followId]) {
                delete newState.following[action.followId]
            }
            return newState
        }
        default: {
            return state
        }
    }
}
