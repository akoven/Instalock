const GET_ALL_POSTS = "posts/get-user-posts"
const GET_PROFILE_NAME = "posts/get-profile-username"

const getAllPosts = (allPosts) => {
    return {
        type: GET_ALL_POSTS,
        allPosts
    }
}

const getName = (profile) => {
    return {
        type: GET_PROFILE_NAME,
        profile
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

const initialState = {};
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const posts = {};
            action.allPosts.posts.forEach((post) => posts[post.id] = post)
            return posts;
        }
        case GET_PROFILE_NAME: {
            const newState = {};
            action.profile.forEach((name) => newState[name.id] = name)
            return newState;
        }
        default:
            return state;
    }
}

export default postsReducer
