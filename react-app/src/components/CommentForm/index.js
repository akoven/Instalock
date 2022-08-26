import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../../store/comment';

const CommentForm = ({ post }) => {
const [commentContent, setCommentContent] = useState('');
const updateComment = (e) => setCommentContent(e.target.value)

const dispatch = useDispatch()
const userSession = useSelector(state => state.session.user)




  const commentSubmit = async(e) => {
    e.preventDefault();
    const data = {
      content: commentContent,
      post_id: post.id,
      user_id: userSession.id
    }

    let newComment = await dispatch(createComment(data))
    if(newComment.id){
      dispatch(getComments(post.id))
    }
    setCommentContent('')
    return newComment
  }

  return (
    <form className="comment-form" onSubmit={commentSubmit}>
        <input type="text"
           value={commentContent}
           onChange={updateComment}
           placeholder='Add a comment' />
    <button type="submit">Post</button>
  </form>
  )
}

export default CommentForm
