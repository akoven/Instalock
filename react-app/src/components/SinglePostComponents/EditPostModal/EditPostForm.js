import React, { useState } from 'react'

function EditPostForm({ post }) {
    const [ caption, setCaption ] = useState(post?.caption)
    const [ imageUrl, setImageUrl ] = useState(post?.image_url)

    const handleSubmit = (e) => {
        e.preventDefault();

        
    }

    return (
        <div className='edit-post-form-container'>
            <div className='edit-post-top-bar'>
                <div>Cancel</div>
                <div>Edit info</div>
                <div>Done</div>
            </div>
            {post && (
            <div className='edit-post-img-cap-container'>
                <div className='edit-img-container'>
                    <img src={imageUrl} alt="There might be something wrong with your image url!" />
                </div>
                <div className='edit-post-form-container'>
                    <form className='edit-post-form'>
                        <div className='edit-post-form-name-display'>
                            <img src={`${post.user.profile_image_url}`} />
                            <div>{post.user.username}</div>
                        </div>
                        <textarea
                            placeholder='Write a caption...'
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder="Image URL here..."
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}

export default EditPostForm;
