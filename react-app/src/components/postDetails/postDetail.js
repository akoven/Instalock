import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/post";
import PostOptionsModal from "../SinglePostComponents/PostOptionsModal";
import { useState } from "react";
import "./posts.css"

const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();
    const post = useSelector((state) => (state.posts[postId]))

    // const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [dispatch])

    return (
        <div className="post-details-container">
            <div className="left-details">
                <img src= {post?.image_url} alt="" />
            </div>
            <div className="right-details">
                <div className="top-right-details">
                    <div className="options-separator">
                        {post?.user?.profile_image_url ? (
                            <img className='user-post-image' src={post.user.profile_image_url} alt="" />
                            ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            <div className="post-details-username">{post?.user?.username}</div>
                            <PostOptionsModal post={post} />
                    </div>
                </div>
                    <div className="post-details-caption">{post?.caption}</div>
                <div className="middle-right-details">
                    {post?.comments && post?.comments.map((comment) => (
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
                                <img className="heart" src="https://img.icons8.com/ios-glyphs/15/000000/like--v2.png" alt=""/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bottom-right-details">
                    <div className="post-likes-section">
                        <div className="like-post-btn">
                        <img className="heart" src="https://img.icons8.com/ios-glyphs/30/000000/like--v2.png" alt=""/>
                        </div>
                        <div className="number-post-likes">
                            {post?.likes} likes
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
