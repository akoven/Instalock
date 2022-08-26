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
            history.push(`/posts/${post.id}`)
        }
        onClick() // close the modal
    }
    console.log(post)
    return (
        <div className="edit-post-container">
            <div className="edit-post-top-bar">
                <div onClick={() => onClick()}>Cancel</div>
                <div style={{'font-weight': 'bold'}}>Edit info</div>
                <button onClick={handleSubmit} className='edit-post-submit-button' type='submit'>Done</button>
            </div>
            <div className="main-edit-container">
                <div className="left-edit-container">
                    <img className='edit-img' src={imageUrl} alt=""/>
                </div>

                <div className="right-edit-container">
                    <form className='edit-post-form-container' onSubmit={handleSubmit}>
                        <div className="user-info-modal">
                            {post?.user?.profile_image_url ? (
                                <img className='user-post-image' src={post.user.profile_image_url} alt="" />
                            ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            <div className='user-post-username'>{post.user.username}</div>
                        </div>
                        <div className='post-caption-edit'>
                            <textarea
                                placeholder='Write a caption...'
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                minlength="20"
                                maxlength="2200"
                                required
                            />
                        </div>
                        <div className="image-url-edit">
                            <input
                                type='text'
                                placeholder="Image URL here..."
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPostForm;
