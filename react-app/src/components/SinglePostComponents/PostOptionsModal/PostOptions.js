import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeleteSpotModal';
import './PostOptions.css'
import { useHistory } from 'react-router-dom';
import { updatePostThunk } from '../../../store/post';

function PostOptions({ post, onClick }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const goToPost = () => {
        history.push(`/posts/${post.id}`)
        onClick()
    }

    const toggleComments = async () => {
        const payload = {
            user_id: user.id,
            caption: post.caption,
            image_url: post.image_url,
            display_comments: !post.display_comments
        }

        let updatedPost = await dispatch(updatePostThunk(payload, post.id))
        if (updatedPost) {
            onClick()
        }
    }

    console.log(user?.id, 'user id')
    console.log(post?.user?.id, 'post user id')

    return (
        <div className='post-options-container'>
        {user && user.id == post.user.id ? (
            <>
            <DeletePostModal post={post}/>
            <EditPostModal post={post} />
            <div className='give-me-a-border' onClick={toggleComments}>{ post.display_comments ? 'Turn off commenting' : 'Turn on commenting' }</div>
            <div className='give-me-a-border' onClick={goToPost}>Go to post</div>
            <div className='give-me-a-border' onClick={onClick} >Cancel</div>
            </>
        ) : (
            <>
            <div>Unfollow</div>
            <div className='give-me-a-border' onClick={goToPost}>Go to post</div>
            <div>Copy link</div>
            <div>Cancel</div>
            </>
        )}
        </div>
    )
}

export default PostOptions;
