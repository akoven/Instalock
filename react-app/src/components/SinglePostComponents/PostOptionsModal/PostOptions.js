import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeleteSpotModal';
import './PostOptions.css'

function PostOptions({ post, onClick }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    return (
        <div className='post-options-container'>
        {user.id == post.user_id ? (
            <>
            <DeletePostModal post={post}/>
            <EditPostModal post={post} />
            <div className='give-me-a-border'>Turn off commenting</div>
            <div className='give-me-a-border' onClick={onClick} >Cancel</div>
            </>
        ) : (
            <>
            <div>Unfollow</div>
            <div>Go to post</div>
            <div>Copy link</div>
            <div>Cancel</div>
            </>
        )}
        </div>
    )
}

export default PostOptions;
