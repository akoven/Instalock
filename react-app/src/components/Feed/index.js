import React from 'react'
// import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getComments } from '../../store/comment'
import { NavLink } from 'react-router-dom'
import { getPostsThunk } from '../../store/post'
import CommentForm from '../CommentForm'
import { getProfileThunk } from '../../store/profile'
import "./Feed.css"
import { getFollowData } from '../../store/follows'
import PostOptionsModal from '../SinglePostComponents/PostOptionsModal'
import { addLikeThunk, removeLikeThunk } from '../../store/likes'

const Feed = () => {

  const posts = useSelector(state => Object.values(state.posts))
  const user = useSelector(state => state.session.user)
  // const [ isLiked, setIsLiked ] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk())
    dispatch(getProfileThunk(user.id))
    dispatch(getFollowData(user.id))
  }, [dispatch, user.id])

//   useEffect(() => {
//     Object.values(likes).forEach(like => {
//         if (like.user.id === user.id) {
//             // setIsLiked(true)
//             return
//         }
//     })
// }, [likes])

  const addLikePost = async (post, isLiked) => {
    const payload = {
        user_id: user.id,
        post_id: post.id
    }

    let like = await dispatch(addLikeThunk(payload))
    dispatch(getPostsThunk())
    isLiked = true
}

const removeLikePost = async (isLiked, likes) => {
  let likeId;
    Object.values(likes).forEach(like => {
        if (like.user.id === user.id) {
          likeId = like.id
        }
    })
    await dispatch(removeLikeThunk(likeId))
    dispatch(getPostsThunk())
    isLiked = false
}


  return (
    <div className='feed'>
      {posts.map(post => {
        let isLiked = false
        let likes = post.like_list
        Object.values(likes).forEach(like => {
          if (like.user.id === user.id) {
              isLiked = true
              return
          }
        console.log(isLiked)
      })
        return (
        <div id={post.id} className='post-container' key={post.id}>
          <div className="post-top">
            <NavLink to={`/profile/${post.user.id}`}>
            <div className="user-post-info">
              {post.user.profile_image_url ? (
                <img className='user-post-image' src={post.user.profile_image_url} alt="" />

              ) : (
                <img className='user-post-image' src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>

              )
              }
            <div>{post.user.username}</div>
            </div>
            </NavLink>
            <PostOptionsModal post={post} />
          </div>
          <NavLink to={`/posts/${post.id}`}>
            <div className='post-image-container'>
              <img className="post-image" src={post.image_url} alt="" />
            </div>
          </NavLink>
          <div className="post-mid">
            <div className='post-user-username'>{post.user.username}</div>
            <div className="like-button">
              <div className="posts-likes">{post.likes} likes</div>
              {likes && !isLiked ? <i onClick={() => addLikePost(post, isLiked)} className="fa-regular fa-heart fa-xl"></i> : <i style={{'color': '#ED4956'}} onClick={() => removeLikePost(isLiked, likes)} class="fa-solid fa-heart fa-xl"></i>}
            </div>
            </div>
            <div className="post-user-caption">{post.caption}</div>
            <NavLink to={`/posts/${post.id}`}>
              <div className="posts-comments">View all {post?.comments?.length} comment(s)</div>
            </NavLink>
            {post && post.display_comments && <div className="post-lower">
            <CommentForm post={post} />
          </div>}
        </div>
      )})}
    </div>
  )
}

export default Feed
