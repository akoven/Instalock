import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getPostsThunk } from "../../store/post";
import PostOptionsModal from "../SinglePostComponents/PostOptionsModal";
import { useState } from "react";
import "./posts.css"
import { addLikeThunk, getPostLikesThunk, removeLikeThunk } from "../../store/likes";
import { getComments } from "../../store/comment";
import CommentForm from "../CommentForm";
const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();

    const post = useSelector(state => state.posts[postId])
    console.log(post)
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
    useEffect(() => {
        dispatch(getComments(postId))

    }, [dispatch]);

    const comments = useSelector(state => state.comments)

    const postsComments = Object.values(comments).filter(comment => comment.post === post.id)


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

                        {post?.user?.profile_image_url ? (
                            <img className='user-post-image' src={post.user.profile_image_url} alt="" />
                            ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            <div className="post-details-username">{post?.user?.username}</div>
                            <PostOptionsModal post={post} />

                </div>
                    <div className="post-details-caption">{post?.caption}</div>
                <div className="middle-right-details">
                    {post && post.display_comments && postsComments && postsComments.map((comment) => (
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
                              <div className="comment-content">{comment?.content}</div>
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
                        {!isLiked ? <i onClick={addLikePost}class="fa-regular fa-heart fa-xl"></i> : <i style={{'color': '#ED4956'}} onClick={removeLikePost} class="fa-solid fa-heart fa-xl"></i>}
                        </div>
                        <div className="number-post-likes">
                            {Object.keys(likes)?.length} likes
                        </div>
                    </div>
                </div>
                <div className="post-comment-form">
                    <CommentForm post={post}/>
                </div>
            </div>
        </div>
        )
}



export default PostDetail
