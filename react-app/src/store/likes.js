const GET_POST_LIKES = "likes/get-post-likes"
const ADD_LIKE = "likes/add-like"
const REMOVE_LIKE = "likes/remove-like"

const getPostLikes = (likes) => {
    return {
        type: GET_POST_LIKES,
        likes
    }
}

const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

export const getPostLikesThunk = (postId) => async dispatch => {
    const res = await fetch(`/api/likes/post/${postId}`)

    if (res.ok) {
        const likes = await res.json();
        dispatch(getPostLikes(likes))
        return likes
    }
}

export const addLikeThunk = (payload) => async dispatch => {
    const res = await fetch('/api/likes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(addLike(like))
        return like
    }
}

export const removeLikeThunk = (likeId) => async dispatch => {
    const res = await fetch(`/api/likes/${likeId}`, { method: 'DELETE' })

    if (res.ok) {
        dispatch(removeLike(likeId))
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_POST_LIKES: {
            let newState = {}
            action.likes.likes.forEach(like => newState[like.id] = like)
            return newState
        }
        case ADD_LIKE: {
            let newState = {...state}
            newState[action.like.id] = action.like
            return newState
        }
        case REMOVE_LIKE: {
            let newState = {...state}
            delete newState[action.likeId]
            return newState
        }
        default:
            return state
    }
}
