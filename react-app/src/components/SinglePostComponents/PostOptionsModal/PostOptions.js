import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './PostOptions.css'

function PostOptions() {
    const dispatch = useDispatch();

    

    return (
        <div className='post-options-container'>
            <DeletePostModal />
            <EditPostModal />
            <div>Turn off commenting</div>
            <div>Cancel</div>
        </div>
    )
}

export default PostOptions;
