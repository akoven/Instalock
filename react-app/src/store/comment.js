
export const ADD_COMMENT = "comments/ADD_COMMENT";
export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";

const add = (comment) => ({
  type: ADD_COMMENT,
  comment
});
const load = (comments, postId) => ({
  type: LOAD_COMMENTS,
  comments,
  postId
});


export const getComments = (postId) => async (dispatch) => {

  const response = await fetch(`/api/posts/${postId}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments, postId));
  }

};

export const createComment = (data) => async (dispatch) => {
  const {
    content,
    user_id,
    post_id
  } = data

  const formData = new FormData()

  formData.append('content', content)
  formData.append('user_id', user_id)
  formData.append('post_id', post_id)


  const response = await fetch(`/api/posts/${data.post_id}/comments`, {
    method: 'POST',
    body: formData
  });
    const newComment = await response.json()


    dispatch(add(newComment))
    return newComment

}
const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_COMMENTS:
      const newComments = {};
      action.comments.comments.forEach(comment => {
        newComments[comment.id] = comment;
      })
      return {
        ...state,
        ...newComments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    default:
      return state;
  }
};
export default commentsReducer
