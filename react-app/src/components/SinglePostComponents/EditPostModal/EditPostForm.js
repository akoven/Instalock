import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updatePostThunk } from '../../../store/post'

function EditPostForm({ post, onClick }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ caption, setCaption ] = useState(post?.caption)
    const [ imageUrl, setImageUrl ] = useState(post?.image_url)
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            caption,
            image_url: imageUrl
        }

        let updatedPost = await dispatch(updatePostThunk(payload, post.id))
        if (updatedPost) {
            history.push('/edit-post-trial')
        }
        onClick() // close the modal
    }

    return (
        <form className='edit-post-form-container' onSubmit={handleSubmit}>
            <div className='edit-post-top-bar'>
                <div onClick={() => onClick()}>Cancel</div>
                <div style={{'font-weight': 'bold'}}>Edit info</div>
                <button className='edit-post-submit-button' type='submit'>Done</button>
            </div>
            {post && (
            <div className='edit-post-img-cap-container'>
                <div className='edit-img-container'>
                    <img src={imageUrl} alt="There might be something wrong with your image url!" />
                </div>
                <div className='edit-post-form-container'>
                    <div className='edit-post-form-name-display'>
                        <img src={`${post.user.profile_image_url}`} />
                        <div>{post.user.username}</div>
                    </div>
                    <div className='edit-post-form'>
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
                    </div>
                </div>
            </div>
            )}
        </form>
    )
}

export default EditPostForm;
