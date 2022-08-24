import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/post";
import "./posts.css"

const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();
    postId = Number(postId)
    // let { userId } = useParams();
    // userId = Number(userId)
    const posts = useSelector((state) => (state.posts))
    const postsString = JSON.stringify(posts)

    let onePost = posts[postId]

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [dispatch, postId, postsString])

    
    return (
        <>
        <div className="main-container">
        <div className="username">{onePost?.user.username}</div>
        <div className="post-detail-img"><img src= {onePost?.image_url} alt="" /></div>
        <div className = "caption">{onePost?.caption}</div>
        <h3 className = "comments-header">Comments</h3>
        <div>
            {onePost?.comments && onePost?.comments.map((comment) => (
                
                <div className="comment" key={comment.id}>
                    <div> Username: {comment.user.username}</div>
                    <div> Comment: {comment.content}</div>
                    <div>------------------</div>
                </div>
            ))}
        </div>
        </div>
        


        </>
    )
}





export default PostDetail