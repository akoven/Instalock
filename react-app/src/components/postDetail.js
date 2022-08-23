import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../store/post";

const PostDetail = () => {
    const dispatch = useDispatch();
    let { postId } = useParams();
    postId = Number(postId)
    const post = useSelector((state) => (state.posts))
    const postsString = JSON.stringify(post)
    const comments = useSelector((state) => Object.values(state.comments))


    
    // const sessionUser = useSelector((state) => state.session.user)
    // const user = useSelector((state) => state.users)
    // let posts = post[postId]
    let posts = post[postId]

    useEffect(() => {
        dispatch(getPosts(postId))
    }, [dispatch, postId, postsString])

    console.log(post, "COMPONENT")
    console.log(postId, "COMPONENT")

    const commentsForThisPost = 

    return (

        <>
        <div>hi</div>
        <div>{posts?.caption}</div>
        {/* <div>{posts?.comments}</div> */}


        </>
    )
}





export default PostDetail