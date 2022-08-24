const GET_ALL_POSTS = "posts/get-user-posts"
const UPDATE_POST = "posts/update-post"

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

export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/`)
    if (response.ok) {
        const post = await response.json();
        console.log(post, "THUNK")
        dispatch(getAllPosts(post))
        const all = {};
        post.posts.forEach((post) => (all[post.id] = post))
        return {...all}
    }

    return {};
}
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


const initialState = {};
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const posts = {};
            console.log(action.allPosts, "REDUCER")
            action.allPosts.posts.forEach((post) => posts[post.id] = post)
            return posts;
        }
        case UPDATE_POST:
            let newState = {...state};
            newState[action.post.id] = action.post;
            return newState;
        default:
            return state;
    }
}

export default postsReducer
