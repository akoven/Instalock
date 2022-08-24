const GET_ALL_POSTS = "posts/get-user-posts"

const getAllPosts = (allPosts) => {
    return {
        type: GET_ALL_POSTS,
        allPosts
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

const initialState = {};
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const posts = {};
            console.log(action.allPosts, "REDUCER")
            action.allPosts.posts.forEach((post) => posts[post.id] = post)
            return posts;
        }
        default:
            return state;
    }
}

export default postsReducer
