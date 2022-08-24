import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsThunk } from '../../store/post'

const Feed = () => {

  const posts = useSelector(state => Object.values(state.posts))
  console.log(posts)
  console.log('sadjklfhsadjof')
  console.log('sadjklfhsadjof')
  console.log('sadjklfhsadjof')
  console.log('sadjklfhsadjof')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch])

  return (
    <div className='single-feed'>
      {posts.map(post => (
        <div className='post-container'>
          <div className="post-top">
            <div className="user-post-info">
              <img src={post.user.profile_image_url} alt="sdfds" />
            </div>
            <div className="user-post-options">
              <img src="https://img.icons8.com/fluency-systems-filled/24/000000/dots-loading.png" alt=""/>
            </div>
          </div>
          <div className="post-image">
            <img src={post.image_url} alt="" />
          </div>
          <div className="post-mid">
            <div className="like-button">

            </div>
            <div className="comment-button">

            </div>
          </div>
          <div className="posts-likes">

          </div>
          <div className="posts-comments">View all {post?.comments?.length} comment(s)</div>
          <div className="post-lower">
            <form action="" className="comment-form">
              <input type="text"
                     placeholder='Add a comment' />
            </form>
          </div>
        </div>

      ))}
    </div>
  )
}

export default Feed
