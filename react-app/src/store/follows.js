const ADD_FOLLOW = 'follows/add_follow'
const GET_FOLLOW_CONNECTIONS = 'follows/get_follow_connections'
const REMOVE_FOLLOW = 'follows/remove_follow'

const addFollow = (follow) => {
    return {
        type: ADD_FOLLOW,
        follow
    }
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

export const addFollowThunk = (payload) => async dispatch => {

    const res = await fetch(`/api/followers/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const follow = await res.json();
        dispatch(addFollow(follow))
        return follow
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
        case ADD_FOLLOW: {
            let newState = {...state}
            newState.followers[action.follow.id] = action.follow.user
            return newState
        }
        default: {
            return state
        }
    }
}
