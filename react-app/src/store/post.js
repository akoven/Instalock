const GET_ALL_POSTS = "posts/get-user-posts"
const UPDATE_POST = "posts/update-post"
const GET_PROFILE_NAME = "posts/get-profile-username"
const DELETE_POST = "posts/delete-post"

const getAllPosts = (allPosts) => {
    return {
        type: GET_ALL_POSTS,
        allPosts
    }
}

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const getName = (profile) => {
    return {
        type: GET_PROFILE_NAME,
        profile
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

//Get All Posts
export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/`)
    if (response.ok) {
        const post = await response.json();
        dispatch(getAllPosts(post))
        const all = {};
        post.posts.forEach((post) => (all[post.id] = post))
        return {...all}
    }

    return {};
}

// //Get Profile Name For Post Detail
// export const getUsersName = (userId) => async(dispatch) => {
//     const response = await fetch(`/api/profile/${userId}`)
//     if (response.ok) {
//         const user = await response.json();
//         dispatch(getName(user))
//         return user;
//     }
//     return response;
// }


//Temporary thunk for testing below
export const getPostsThunk = () => async dispatch => {
    const res = await fetch('/api/posts')
    const posts = await res.json();
    dispatch(getAllPosts(posts));
    return res;
}

export const updatePostThunk = (payload, postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const post = await res.json()
        dispatch(updatePost(post))
        return post
    }
}

export const deletePostThunk = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })

    if (res.ok) {
        dispatch(deletePost(postId))
    }
}


const initialState = {};
const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_POSTS: {
            const posts = {};
            action.allPosts.posts.forEach((post) => posts[post.id] = post)
            return posts;
        }
        case UPDATE_POST:
            newState = {...state};
            newState[action.post.id] = action.post;
            return newState;
        case GET_PROFILE_NAME: {
            const newState = {};
            action.profile.forEach((name) => newState[name.id] = name)
            return newState;
        }
        case DELETE_POST:
            newState = {...state}
            delete newState[action.postId]
            return newState
        default:
            return state;
    }
}

export default postsReducer
