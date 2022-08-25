import React from 'react'
import { useDispatch } from 'react-redux'
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeleteSpotModal';
import './PostOptions.css'

function PostOptions({ post }) {
    const dispatch = useDispatch();

    return (
        <div className='post-options-container'>
            <DeletePostModal post={post}/>
            <EditPostModal post={post} />
            <div className='give-me-a-border'>Turn off commenting</div>
            <div className='give-me-a-border'>Cancel</div>
        </div>
    )
}

export default PostOptions;
