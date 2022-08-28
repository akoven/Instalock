import React from "react";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../../store/post";
import { useHistory } from "react-router-dom";


function DeletePost({ post, onClick }) {
    let dispatch = useDispatch();
    let history = useHistory();

    const onDelete = () => {
        dispatch(deletePostThunk(post.id))
        history.push('/')
    }

    return (
        <div className="delete-post">
            <div className="delete-head">
                <h3>Delete post?</h3>
                <div>Are you sure you want to delete this post?</div>
            </div>
            <div className="delete-option delete-button" onClick={onDelete}>Delete</div>
            <div className="delete-option cancel" onClick={onClick}>Cancel</div>
        </div>
    )
}

export default DeletePost
