import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getPostsThunk } from '../../store/post'
import CommentForm from '../CommentForm'
import { displayUserInfo } from '../../store/profile'
import "./Feed.css"
const Feed = () => {

  const posts = useSelector(state => Object.values(state.posts))
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(displayUserInfo(user.id))
  }, [dispatch])


  return (
    <div className='feed'>
      {posts.map(post => (
        <div id={post.id} className='post-container'>
          <NavLink to={`/posts/${post.id}`}>
          <div className="post-top">
            <div className="user-post-info">
              {post.user.profile_image_url ? (
                <img className='user-post-image' src={post.user.profile_image_url} alt="" />

              ) : (
                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>

              )
            }
              <div>{post.user.username}</div>
            </div>
            <div className="user-post-options">
              <img src="https://img.icons8.com/fluency-systems-filled/24/000000/dots-loading.png" alt=""/>
            </div>
          </div>
          <div>
            <img className="post-image" src={post.image_url} alt="" />
          </div>
          <div className="post-mid">
            <div className="like-button">

            </div>
            <div className="comment-button">

            </div>
          </div>
          <div className="posts-likes">

          </div>
          <div className="post-user-caption">
            <div className='post-user-username'>{post.user.username}</div>
            <div>{post.caption}</div>
          </div>
          <div className="posts-comments">View all {post?.comments?.length} comment(s)</div>
          </NavLink>
          <div className="post-lower">
            <CommentForm post={post} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feed
