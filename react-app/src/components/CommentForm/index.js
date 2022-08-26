import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../../store/comment';
import './CommentForm.css';

const CommentForm = ({ post }) => {
const [commentContent, setCommentContent] = useState('');
const [errorValidators, setErrorValidators] = useState('');
const updateComment = (e) => setCommentContent(e.target.value);

const dispatch = useDispatch()
const userSession = useSelector(state => state.session.user)


let errors = [];

  const commentSubmit = async(e) => {
    e.preventDefault();
    const data = {
      content: commentContent,
      post_id: post.id,
      user_id: userSession.id
    }

    let newComment = await dispatch(createComment(data))
    if(commentContent.length === 0){
      errors.push('Your comment needs at least one character')
    }

    if(newComment.id && errors.length !== 0){
      dispatch(getComments(post.id))
    }
    setCommentContent('')
    return newComment
  }

  return (
    <form className="comment-form" onSubmit={commentSubmit}>
      <ul>{errorValidators.map(error =><li>{error}</li>)}</ul>
        <input type="text"
           value={commentContent}
           onChange={updateComment}
           placeholder='Add a comment' />
    <button type="submit">Post</button>
  </form>
  )
}

export default CommentForm
