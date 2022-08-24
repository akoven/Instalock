import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
const [commentContent, setCommentContent] = useState('');
const updateComment = (e) => setCommentContent(e.target.value)

const userSession = useSelector(state => state.session.user)



  const commentSubmit = (e, postId) => {
    e.preventDefault();
    const data = {
      content: commentContent,
      post_id: post.id,
      user_id: userSession.id
    }
    console.log(data, 'data')
  }
  return (
    <form action="" className="comment-form" onSubmit={(e) => commentSubmit(e, post.id)}>
    <input type="text"
           value={commentContent}
           onChange={updateComment}
           placeholder='Add a comment' />
    <button type="submit">Post</button>
  </form>
  )
}

export default CommentForm
