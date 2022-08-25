import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getPostsThunk } from "../../store/post";
import PostOptionsModal from "../SinglePostComponents/PostOptionsModal";
import { useState } from "react";
import "./posts.css"
import { addLikeThunk, getPostLikesThunk, removeLikeThunk } from "../../store/likes";

const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();
    const post = useSelector(state => state.posts[postId])
    const user = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const [ isLiked, setIsLiked ] = useState(() => {
        let result = false
        Object.values(likes).forEach(like => {
            console.log(like.user.id)
            console.log(user.id)
            if (like.user.id === user.id) {
                result = true
                return
            }
        })
    console.log(result, "result")
        return result
    })

    // const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getPosts(postId))
        dispatch(getPostLikesThunk(postId))
    }, [dispatch])

    const addLikePost = async () => {
        const payload = {
            user_id: user.id,
            post_id: post.id
        }

        let like = await dispatch(addLikeThunk(payload))
        dispatch(getPostsThunk())
        setIsLiked(true)
    }

    const removeLikePost = async () => {
        Object.values(likes).forEach(like => {
            if (like.user.id === user.id) {
                dispatch(removeLikeThunk(like.id))
                dispatch(getPostsThunk())
                return
            }
        })
        setIsLiked(false)
    }

    return (
        <div className="post-details-container">
            <div className="left-details">
                <img src= {post?.image_url} alt="" />
            </div>
            <div className="right-details">
                <div className="top-right-details">
                    <div className="options-separator">
                        <NavLink to={`/profile/${post?.user.id}`} >
                        {post?.user?.profile_image_url ? (
                            <img className='user-post-image' src={post.user.profile_image_url} alt="" />
                        ) : (
                            <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                            )
                        }
                        </NavLink>
                        <div className="post-details-username">{post?.user?.username}</div>
                        <PostOptionsModal post={post} />
                    </div>
                </div>
                    <div className="post-details-caption">{post?.caption}</div>
                <div className="middle-right-details">
                    {post && post.display_comments && post?.comments && post?.comments.map((comment) => (
                        <div className="comment-users-info">
                            <div className="comment-user-details">
                                <div>
                                {post?.user?.profile_image_url ? (
                                    <img className='user-post-image' src={post.user.profile_image_url} alt="" />
                                ) : (
                                    <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                    )
                                }
                                </div>
                                <div className="comment-user-name">
                                    {comment?.user?.username}
                                </div>
                              <div>{comment?.content}</div>
                            </div>
                            <div className="comment-likes-section">
                                <div className="likes-info">{comment?.likes} likes</div>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bottom-right-details">
                    <div className="post-likes-section">
                        <div className="like-post-btn">
                        {!isLiked ? <i onClick={addLikePost} className="fa-regular fa-heart fa-xl"></i> : <i style={{'color': '#ED4956'}} onClick={removeLikePost} class="fa-solid fa-heart fa-xl"></i>}
                        </div>
                        <div className="number-post-likes">
                            {Object.keys(likes)?.length} likes
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}


// {/* <div className="main-container">
// <div className="username">{onePost?.user.username}</div>
// <div className="post-detail-img"><img src= {onePost?.image_url} alt="" /></div>
// <div className = "caption">{onePost?.caption}</div>
// <h3 className = "comments-header">Comments</h3>
// <div>
    // {onePost?.comments && onePost?.comments.map((comment) => (

    //     <div className="comment" key={comment.id}>
    //         <div> Username: {comment.user.username}</div>
    //         <div> Comment: {comment.content}</div>
    //         <div>------------------</div>
    //     </div>
    // ))}
// </div>
// </div> */}




export default PostDetail
