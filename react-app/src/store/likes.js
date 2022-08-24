const GET_POST_LIKES = "likes/get-post-likes"

const getPostLikes = (likes) => {
    return {
        type: GET_POST_LIKES,
        likes
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

export default function reducer(state = {}, action) {
    switch (action.type){
        case GET_POST_LIKES:
            newState = {}
            action.likes.forEach(like => newState[like.id] = like)
            return newState
        default:
            return state
    }
}
