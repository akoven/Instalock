import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const CommentForm = ({ post }) => {
const [commentContent, setCommentContent] = useState('');
const updateComment = (e) => setCommentContent(e.target.value)



  const commentSubmit = (e, postId) => {
    e.preventDefault();
    const data = {
      content: commentContent,
    }

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
