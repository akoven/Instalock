import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/post";
import "./posts.css"

const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();
    postId = Number(postId)
    const posts = useSelector((state) => (state.posts))
    const postsString = JSON.stringify(posts)
    // const comments = useSelector((state) => (state.comments))
    // console.log(comments, "comments")

    let onePost = posts[postId]

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [dispatch, postId, postsString])


    return (

        <>
        <div className="img"><img src= {onePost?.image_url} alt="" /></div>
        <div>{onePost?.caption}</div>
        <h3>Comments</h3>
        <div>
            {onePost?.comments && onePost?.comments.map((comment) => (
                <div key={comment.id}>{comment.content}</div>
            ))}
        </div>


        </>
    )
}





export default PostDetail