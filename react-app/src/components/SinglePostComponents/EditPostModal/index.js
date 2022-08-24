import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../context/Modal'
import { getPostsThunk } from '../../../store/post'
import EditPostForm from './EditPostForm'
import './EditPost.css'

function EditPostModal() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const post = useSelector(state => state.posts[1])


    useEffect(() => {
        dispatch(getPostsThunk())
    }, [dispatch])

    return (
        <>
        <div className='edit-post-button' onClick={() => setShowModal(true)}>Edit</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditPostForm post={post} />
            </Modal>
        )}
        </>
    )
}

export default EditPostModal
